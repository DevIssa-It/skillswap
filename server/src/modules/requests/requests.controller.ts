import { Response } from 'express';
import { AuthRequest } from '../../shared/types';
import { requestsService } from './requests.service';
import { respond } from '../../shared/utils/response.utils';
import { io } from '../../index';

export const requestsController = {
  async create(req: AuthRequest, res: Response): Promise<void> {
    const { offerSkill, needSkill, description, timeEstimate, category } = req.body;

    if (!offerSkill || !needSkill || !category) {
      respond.badRequest(res, 'offerSkill, needSkill, and category are required');
      return;
    }

    try {
      const request = await requestsService.create(
        req.userId!,
        { offerSkill, needSkill, description, timeEstimate, category },
        io
      );
      respond.created(res, request);
    } catch {
      respond.error(res, 'Failed to create swap request');
    }
  },

  async getAll(req: AuthRequest, res: Response): Promise<void> {
    const { category, search } = req.query as { category?: string; search?: string };
    try {
      const requests = await requestsService.getAll({ category, search });
      respond.success(res, requests);
    } catch {
      respond.error(res, 'Failed to fetch requests');
    }
  },

  async getMy(req: AuthRequest, res: Response): Promise<void> {
    try {
      const requests = await requestsService.getMyRequests(req.userId!);
      respond.success(res, requests);
    } catch {
      respond.error(res, 'Failed to fetch your requests');
    }
  },

  async cancel(req: AuthRequest, res: Response): Promise<void> {
    try {
      const updated = await requestsService.cancel(req.params.id as string, req.userId!);
      respond.success(res, updated);
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'NOT_FOUND') {
        respond.notFound(res, 'Request');
      } else if (err instanceof Error && err.message === 'FORBIDDEN') {
        respond.error(res, 'Forbidden', 403);
      } else {
        respond.error(res, 'Failed to cancel request');
      }
    }
  },
};
