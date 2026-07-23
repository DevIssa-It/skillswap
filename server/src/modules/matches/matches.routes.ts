import { Router } from 'express';
import { matchesController } from './matches.controller';
import { authMiddleware } from '../../shared/middleware/auth.middleware';

export const matchesRouter = Router();

// All match routes require auth
matchesRouter.use(authMiddleware);

matchesRouter.get('/my', matchesController.getMy);
matchesRouter.post('/:id/accept', matchesController.accept);
matchesRouter.post('/:id/reject', matchesController.reject);
matchesRouter.post('/:id/complete', matchesController.complete);
