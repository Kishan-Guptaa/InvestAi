import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { prisma } from '../config/db';
import { getAuth } from '@clerk/express';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const auth = getAuth(req);
    const userId = auth.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const key_id = process.env.RAZORPAY_KEY_ID || 'dummy_key';
    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'dummy_secret';

    // Demo Mode bypass if keys are not configured
    if (key_id === 'dummy_key' || key_id === 'rzp_test_your_key_id') {
      res.json({
        id: `order_demo_${Date.now()}`,
        amount: 49900,
        currency: 'INR'
      });
      return;
    }

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const options = {
      amount: 49900, // Rs 499.00
      currency: 'INR',
      receipt: `rcpt_${Date.now().toString().slice(-8)}`
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const verifyPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const auth = getAuth(req);
    const userId = auth.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Demo Mode verification bypass
    if (razorpay_signature === 'demo_signature') {
      await (prisma as any).user.update({
        where: { id: userId },
        data: {
          plan: 'PRO',
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
        }
      });
      res.json({ success: true, message: 'Demo payment verified and plan upgraded' });
      return;
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || 'dummy_secret';

    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      // Payment is successful
      
      // Update User Plan in DB
      await (prisma as any).user.update({
        where: { id: userId },
        data: {
          plan: 'PRO',
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
        }
      });

      res.json({ success: true, message: 'Payment verified and plan upgraded' });
    } else {
      res.status(400).json({ error: 'Invalid signature' });
    }
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
