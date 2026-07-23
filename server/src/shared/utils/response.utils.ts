import { Response } from 'express';
import { ApiResponse } from '../types';

export const respond = {
  success<T>(res: Response, data: T, status = 200): Response {
    const body: ApiResponse<T> = { success: true, data };
    return res.status(status).json(body);
  },

  created<T>(res: Response, data: T): Response {
    return respond.success(res, data, 201);
  },

  error(res: Response, message: string, status = 500): Response {
    const body: ApiResponse = { success: false, error: message };
    return res.status(status).json(body);
  },

  notFound(res: Response, resource = 'Resource'): Response {
    return respond.error(res, `${resource} not found`, 404);
  },

  unauthorized(res: Response, message = 'Unauthorized'): Response {
    return respond.error(res, message, 401);
  },

  badRequest(res: Response, message: string): Response {
    return respond.error(res, message, 400);
  },

  conflict(res: Response, message: string): Response {
    return respond.error(res, message, 409);
  },
};
