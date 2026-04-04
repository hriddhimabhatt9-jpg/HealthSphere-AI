// ============================================================================
// HealthSphere AI — Role-Based Access Control (RBAC) Middleware
// ============================================================================

import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

type Role = 'PATIENT' | 'DOCTOR' | 'ADMIN';

/**
 * Creates middleware that restricts access to users with specified roles.
 * Must be used AFTER the authenticate middleware.
 */
export function authorize(...allowedRoles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError('Authentication required.', 401, 'UNAUTHORIZED'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(
          'You do not have permission to access this resource.',
          403,
          'FORBIDDEN',
        ),
      );
    }

    next();
  };
}

/**
 * Middleware verifying the request user matches the resource owner, 
 * OR is an admin.
 */
export function authorizeOwnerOrAdmin(paramKey: string = 'id') {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError('Authentication required.', 401, 'UNAUTHORIZED'));
    }

    const resourceOwnerId = req.params[paramKey];
    const isOwner = req.user.userId === resourceOwnerId;
    const isAdmin = req.user.role === 'ADMIN';

    if (!isOwner && !isAdmin) {
      return next(
        new AppError(
          'You can only access your own resources.',
          403,
          'FORBIDDEN',
        ),
      );
    }

    next();
  };
}
