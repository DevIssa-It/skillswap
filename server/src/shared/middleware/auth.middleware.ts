import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { jwtUtils } from '../utils/jwt.utils';
import { respond } from '../utils/response.utils';

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const token =
    req.cookies?.token ||
    req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    respond.unauthorized(res, 'Authentication required');
    return;
  }

  try {
    const payload = jwtUtils.verify(token);
    req.userId = payload.userId;
    next();
  } catch {
    respond.unauthorized(res, 'Invalid or expired token');
  }
}
