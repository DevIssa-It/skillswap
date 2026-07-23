import { Response } from 'express';
import { AuthRequest } from '../../shared/types';
import { ratingsService } from './ratings.service';
import { respond } from '../../shared/utils/response.utils';

export const ratingsController = {
  async create(req: AuthRequest, res: Response): Promise<void> {
    const { matchId, score, comment } = req.body;

    if (!matchId || !score || score < 1 || score > 5) {
      respond.badRequest(res, 'matchId and score (1-5) are required');
      return;
    }

    try {
      const rating = await ratingsService.create(req.userId!, { matchId, score, comment });
      respond.created(res, rating);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '';
      if (msg === 'NOT_FOUND') respond.notFound(res, 'Match');
      else if (msg === 'NOT_COMPLETED') respond.badRequest(res, 'Match must be completed first');
      else if (msg === 'ALREADY_RATED') respond.conflict(res, 'Already rated this match');
      else if (msg === 'SELF_RATE') respond.badRequest(res, 'Cannot rate yourself');
      else respond.error(res, 'Failed to submit rating');
    }
  },
};
