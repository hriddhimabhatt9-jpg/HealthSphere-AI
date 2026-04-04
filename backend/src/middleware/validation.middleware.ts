// ============================================================================
// HealthSphere AI — Zod Validation Middleware
// Validates request body, query, and params against Zod schemas
// ============================================================================

import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

type ValidationTarget = 'body' | 'query' | 'params';

/**
 * Creates Express middleware that validates the specified request part
 * against a Zod schema. On failure, passes a ZodError to the error handler.
 */
export function validate(schema: ZodSchema, target: ValidationTarget = 'body') {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const data = schema.parse(req[target]);
      // Replace the target with the parsed/transformed data
      (req as Record<string, unknown>)[target] = data;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(error);
      } else {
        next(error);
      }
    }
  };
}
