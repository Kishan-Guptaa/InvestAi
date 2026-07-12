import { Router } from 'express';
import { analyzeController } from '../controllers/analyzeController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Real-time Market Data
router.get('/quote/:ticker', authMiddleware, analyzeController.getQuote);

// Modular AI Analysis Routes
router.post('/analyze/company', authMiddleware, analyzeController.analyzeCompany);
router.post('/analyze/finance', authMiddleware, analyzeController.analyzeFinance);
router.post('/analyze/news', authMiddleware, analyzeController.analyzeNews);
router.post('/analyze/swot', authMiddleware, analyzeController.analyzeSwot);
router.post('/analyze/risk', authMiddleware, analyzeController.analyzeRisk);
router.post('/analyze/recommendation', authMiddleware, analyzeController.analyzeRecommendation);

// Save Final Report
router.post('/analyze/save', authMiddleware, analyzeController.saveReport);

// Chat (Publicly accessible for global bot)
router.post('/chat', analyzeController.analyzeChat);

// History Routes
router.get('/history', authMiddleware, analyzeController.history);
router.delete('/history/:id', authMiddleware, analyzeController.deleteHistory);

// Public Shared Report Route
router.get('/shared/:id', analyzeController.getSharedReport);

// Legacy full analysis (optional, but keep for compatibility if needed)
router.post('/analyze', authMiddleware, analyzeController.analyze);

export default router;
