import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';
import { AuthRequest } from '../middlewares/authMiddleware';

export class UserInteractionController {
  
  // --- Contact Support ---
  public saveContactMessage = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, email, subject, message } = req.body;
      const userId = req.auth?.userId; // Optional, might be unauthenticated if they aren't logged in

      const contact = await prisma.contactMessage.create({
        data: {
          name,
          email,
          subject,
          message,
          userId: userId || null,
        }
      });
      res.status(201).json({ status: 'success', data: contact });
    } catch (error) {
      console.error('Error saving contact message:', error);
      res.status(500).json({ status: 'error', message: 'Failed to save contact message' });
    }
  };

  public getContactMessages = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.auth?.userId;
      if (!userId) {
        res.status(401).json({ status: 'error', message: 'Unauthorized' });
        return;
      }
      const messages = await prisma.contactMessage.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      });
      res.status(200).json({ status: 'success', data: messages });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Failed to retrieve messages' });
    }
  };

  // --- Search History ---
  public saveSearchQuery = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { query } = req.body;
      const userId = req.auth?.userId;
      if (!userId || !query) {
        res.status(200).json({ status: 'success' }); // Ignore if no user or query
        return;
      }
      
      const search = await prisma.searchQuery.create({
        data: { query, userId }
      });
      res.status(201).json({ status: 'success', data: search });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Failed to save search' });
    }
  };

  public getSearchHistory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.auth?.userId;
      if (!userId) {
        res.status(401).json({ status: 'error', message: 'Unauthorized' });
        return;
      }
      const searches = await prisma.searchQuery.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 10 // Last 10 searches
      });
      res.status(200).json({ status: 'success', data: searches });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Failed to retrieve searches' });
    }
  };

  // --- AI Chat ---
  public saveChatMessage = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { reportId, role, content } = req.body;
      const userId = req.auth?.userId;
      if (!userId) {
        res.status(401).json({ status: 'error', message: 'Unauthorized' });
        return;
      }

      const message = await prisma.chatMessage.create({
        data: {
          userId,
          reportId: reportId || null,
          role,
          content
        }
      });
      res.status(201).json({ status: 'success', data: message });
    } catch (error) {
      console.error('Save chat error:', error);
      res.status(500).json({ status: 'error', message: 'Failed to save chat message' });
    }
  };

  public getChatHistory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { reportId } = req.params;
      const userId = req.auth?.userId;
      if (!userId) {
        res.status(401).json({ status: 'error', message: 'Unauthorized' });
        return;
      }

      const messages = await prisma.chatMessage.findMany({
        where: { userId, reportId },
        orderBy: { createdAt: 'asc' }
      });
      res.status(200).json({ status: 'success', data: messages });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Failed to retrieve chat history' });
    }
  };
}

export const userInteractionController = new UserInteractionController();
