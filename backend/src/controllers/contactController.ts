import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const sendContactEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ error: 'Name, email, and message are required.' });
      return;
    }

    // Configure the transporter
    // For local dev without a real password, this might fail unless SMTP_PASS is provided
    const smtpUser = process.env.SMTP_USER || 'your-email@gmail.com';
    const smtpPass = process.env.SMTP_PASS || 'your-app-password';

    if (smtpPass === 'your-app-password') {
      console.log(`\n--- MOCK EMAIL SENT ---`);
      console.log(`To: timewithtitu@gmail.com`);
      console.log(`From: ${name} <${email}>`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: \n${message}`);
      console.log(`-----------------------\n`);
      
      res.json({ success: true, message: 'Message logged (SMTP not configured)' });
      return;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'timewithtitu@gmail.com',
      subject: `InvestIQ Support: ${subject || 'New Contact Request'}`,
      text: `You have received a new support request from InvestIQ AI.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #1D4ED8;">New Support Request</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
