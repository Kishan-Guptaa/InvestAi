import { Router } from 'express';
import { userInteractionController } from '../controllers/userInteractionController';
import { authMiddleware, optionalAuthMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Contact
router.post('/contact', optionalAuthMiddleware, userInteractionController.saveContactMessage);
router.get('/contact', authMiddleware, userInteractionController.getContactMessages);

// Search
router.post('/search', optionalAuthMiddleware, userInteractionController.saveSearchQuery);
router.get('/search', authMiddleware, userInteractionController.getSearchHistory);

// Chat
router.post('/chat', optionalAuthMiddleware, userInteractionController.saveChatMessage);
router.get('/chat/:reportId', authMiddleware, userInteractionController.getChatHistory);

export default router;
