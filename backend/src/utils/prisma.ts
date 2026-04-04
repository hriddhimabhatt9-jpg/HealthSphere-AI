// ============================================================================
// HealthSphere AI — Prisma Client Singleton
// Prevents multiple PrismaClient instances in development (hot-reload safe)
// ============================================================================

import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? [
            { level: 'query', emit: 'event' },
            { level: 'error', emit: 'stdout' },
            { level: 'warn', emit: 'stdout' },
          ]
        : [{ level: 'error', emit: 'stdout' }],
  });

if (process.env.NODE_ENV === 'development') {
  // Log slow queries in development
  (prisma as PrismaClient & { $on: (event: string, cb: (e: { duration: number; query: string }) => void) => void })
    .$on('query', (e: { duration: number; query: string }) => {
      if (e.duration > 200) {
        logger.warn(`Slow query (${e.duration}ms): ${e.query}`);
      }
    });
}

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

/**
 * Gracefully disconnect Prisma on shutdown
 */
export async function disconnectPrisma(): Promise<void> {
  await prisma.$disconnect();
  logger.info('Prisma client disconnected');
}
