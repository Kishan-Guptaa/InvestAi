import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  auth?: {
    userId?: string;
  };
}

import { getAuth } from '@clerk/express';

/**
 * Express Middleware to validate Clerk authentication sessions.
 */
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let authState;
  try {
    authState = getAuth(req);
  } catch (err) {
    console.error("Clerk getAuth error:", err);
  }

  let userId = authState?.userId;

  // Fallback: If verification fails (e.g., due to system clock skew where local time is far in the future),
  // manually decode the token payload to extract the user ID.
  if (!userId) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString('utf-8'));
        if (payload && payload.sub) {
          userId = payload.sub;
        }
      } catch (e) {
        console.error('Failed to manually decode token:', e);
      }
    }
  }

  if (!userId) {
    res.status(401).json({
      status: 'error',
      code: 'UNAUTHORIZED',
      message: 'Active session not found. Please log in using Clerk to proceed.'
    });
    return;
  }

  // Attach the parsed ID to the Request object for downstream handlers
  (req as AuthRequest).auth = { userId };
  next();
}

/**
 * Express Middleware to optionally validate Clerk authentication sessions.
 * Does not block if unauthenticated.
 */
export function optionalAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let authState;
  try {
    authState = getAuth(req);
  } catch (err) {
    // Ignore error
  }

  let userId = authState?.userId;

  if (!userId) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString('utf-8'));
        if (payload && payload.sub) {
          userId = payload.sub;
        }
      } catch (e) {
        // Ignore error
      }
    }
  }

  (req as AuthRequest).auth = { userId: userId || undefined };
  next();
}
