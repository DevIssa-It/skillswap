import { Router } from 'express';
import { requestsController } from './requests.controller';
import { authMiddleware } from '../../shared/middleware/auth.middleware';

export const requestsRouter = Router();

requestsRouter.get('/', requestsController.getAll);                             // Public
requestsRouter.post('/', authMiddleware, requestsController.create);             // Protected
requestsRouter.get('/my', authMiddleware, requestsController.getMy);             // Protected
requestsRouter.patch('/:id/cancel', authMiddleware, requestsController.cancel);  // Protected
