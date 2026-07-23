import { Response } from 'express';
import { AuthRequest } from '../../shared/types';
import { authService } from './auth.service';
import { jwtUtils } from '../../shared/utils/jwt.utils';
import { respond } from '../../shared/utils/response.utils';

// Controller: only HTTP layer — parse req → call service → format res
export const authController = {
  async register(req: AuthRequest, res: Response): Promise<void> {
    const { name, campus, email, password, skills } = req.body;

    if (!name || !campus || !email || !password) {
      respond.badRequest(res, 'name, campus, email, and password are required');
      return;
    }
    if (password.length < 8) {
      respond.badRequest(res, 'Password must be at least 8 characters');
      return;
    }

    try {
      const result = await authService.register({ name, campus, email, password, skills });
      res.cookie('token', result.token, jwtUtils.cookieOptions());
      respond.created(res, result);
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'EMAIL_TAKEN') {
        respond.conflict(res, 'Email already registered');
      } else {
        respond.error(res, 'Registration failed');
      }
    }
  },

  async login(req: AuthRequest, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      respond.badRequest(res, 'Email and password are required');
      return;
    }

    try {
      const result = await authService.login({ email, password });
      res.cookie('token', result.token, jwtUtils.cookieOptions());
      respond.success(res, result);
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'INVALID_CREDENTIALS') {
        respond.unauthorized(res, 'Invalid email or password');
      } else {
        respond.error(res, 'Login failed');
      }
    }
  },

  async logout(_req: AuthRequest, res: Response): Promise<void> {
    res.clearCookie('token');
    respond.success(res, { message: 'Logged out successfully' });
  },

  async me(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = await authService.getMe(req.userId!);
      respond.success(res, user);
    } catch {
      respond.notFound(res, 'User');
    }
  },
};
