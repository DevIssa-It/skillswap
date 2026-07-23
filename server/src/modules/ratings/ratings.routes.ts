import { Router } from 'express';
import { ratingsController } from './ratings.controller';
import { authMiddleware } from '../../shared/middleware/auth.middleware';

export const ratingsRouter = Router();

ratingsRouter.post('/', authMiddleware, ratingsController.create);
