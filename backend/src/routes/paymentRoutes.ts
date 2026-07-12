import { Router } from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController';

const router = Router();

// Endpoint to create a Razorpay order
router.post('/create-order', createOrder);

// Endpoint to verify payment signature and update plan
router.post('/verify', verifyPayment);

export default router;
