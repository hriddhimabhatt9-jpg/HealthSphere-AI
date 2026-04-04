// ============================================================================
// HealthSphere AI — JWT Auth Middleware
// Verifies access tokens and attaches user to request
// ============================================================================

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/environment';
import { AppError } from './errorHandler';

export interface JwtPayload {
  userId: string;
  email: string;
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError('Authentication required.', 401, 'UNAUTHORIZED');
    }

    const token = authHeader.slice(7);

    if (!token) {
      throw new AppError('Authentication token missing.', 401, 'TOKEN_MISSING');
    }

    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(new AppError('Token expired.', 401, 'TOKEN_EXPIRED'));
    } else if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Invalid token.', 401, 'TOKEN_INVALID'));
    } else {
      next(error);
    }
  }
}

export function optionalAuth(req: Request, _res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
      req.user = decoded;
    }
  } catch {
    // Silent — optional auth, user not set
  }
  next();
}
