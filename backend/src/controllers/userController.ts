import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';
import { AuthRequest } from '../middlewares/authMiddleware';

export class UserController {
  /**
   * Syncs the authenticated Clerk user's details into the PostgreSQL database.
   */
  public syncUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authReq = req as AuthRequest;
      const userId = authReq.auth?.userId;

      if (!userId) {
        res.status(401).json({ status: 'error', message: 'Unauthorized access.' });
        return;
      }

      const { email, firstName, lastName, imageUrl } = req.body;

      // Upsert the user into the database
      const user = await prisma.user.upsert({
        where: { id: userId },
        update: {
          email,
          firstName,
          lastName,
          imageUrl,
        },
        create: {
          id: userId,
          email,
          firstName,
          lastName,
          imageUrl,
        }
      });

      res.status(200).json({ status: 'success', data: user });
    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController();
