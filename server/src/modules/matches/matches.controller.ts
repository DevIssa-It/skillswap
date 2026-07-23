import { Response } from 'express';
import { AuthRequest } from '../../shared/types';
import { matchesService } from './matches.service';
import { respond } from '../../shared/utils/response.utils';
import { io } from '../../index';

export const matchesController = {
  async getMy(req: AuthRequest, res: Response): Promise<void> {
    try {
      const matches = await matchesService.getMyMatches(req.userId!);
      respond.success(res, matches);
    } catch {
      respond.error(res, 'Failed to fetch matches');
    }
  },

  async accept(req: AuthRequest, res: Response): Promise<void> {
    try {
      const match = await matchesService.accept(req.params.id as string, req.userId!, io);
      respond.success(res, match);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '';
      if (msg === 'NOT_FOUND') respond.notFound(res, 'Match');
      else if (msg === 'FORBIDDEN') respond.error(res, 'Forbidden', 403);
      else if (msg === 'INVALID_STATE') respond.badRequest(res, 'Match is not in pending state');
      else respond.error(res, 'Failed to accept match');
    }
  },

  async reject(req: AuthRequest, res: Response): Promise<void> {
    try {
      const match = await matchesService.reject(req.params.id as string, req.userId!);
      respond.success(res, match);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '';
      if (msg === 'NOT_FOUND') respond.notFound(res, 'Match');
      else if (msg === 'FORBIDDEN') respond.error(res, 'Forbidden', 403);
      else respond.error(res, 'Failed to reject match');
    }
  },

  async complete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const match = await matchesService.complete(req.params.id as string, req.userId!);
      respond.success(res, match);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '';
      if (msg === 'NOT_FOUND') respond.notFound(res, 'Match');
      else if (msg === 'FORBIDDEN') respond.error(res, 'Forbidden', 403);
      else if (msg === 'INVALID_STATE') respond.badRequest(res, 'Match must be accepted first');
      else respond.error(res, 'Failed to complete match');
    }
  },
};
