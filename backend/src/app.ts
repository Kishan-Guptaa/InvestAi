import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';
import { config } from './config';
import analyzeRoutes from './routes/analyzeRoutes';
import userRoutes from './routes/userRoutes';
import paymentRoutes from './routes/paymentRoutes';
import contactRoutes from './routes/contactRoutes';
import userInteractionRoutes from './routes/userInteractionRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// Standard credentials CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Mount global Clerk middleware to parse tokens and sessions automatically
app.use(clerkMiddleware({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
}));

// Body parser
app.use(express.json());

// Mount analytics router on /api
app.use('/api', analyzeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/contact', contactRoutes); // legacy contact
app.use('/api/interactions', userInteractionRoutes);

// General health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Attach global error middleware
app.use(errorHandler);

// Start listening
const server = app.listen(config.port, () => {
  console.log(`🚀 [InvestIQ AI Backend] Server successfully initiated in "${config.nodeEnv}" mode.`);
  console.log(`🔗 Access locally at: http://localhost:${config.port}`);
});

export default app;
