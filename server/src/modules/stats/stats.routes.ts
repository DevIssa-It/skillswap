import { Router, Request, Response } from 'express';
import { prisma } from '../../infrastructure/database/prisma.client';
import { respond } from '../../shared/utils/response.utils';

export const statsRouter = Router();

statsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const [users, completedMatches, activeRequests] = await Promise.all([
      prisma.user.count(),
      prisma.match.count({ where: { status: 'completed' } }),
      prisma.swapRequest.count({ where: { status: 'active' } }),
    ]);

    respond.success(res, {
      totalUsers: users,
      totalSwaps: completedMatches,
      activeRequests,
    });
  } catch {
    respond.error(res, 'Failed to fetch stats');
  }
});
