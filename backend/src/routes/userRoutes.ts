import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Sync user details to local database
router.post('/sync', authMiddleware, userController.syncUser);

export default router;
