import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types';

const SECRET = process.env.JWT_SECRET || 'skillswap-dev-secret';

export const jwtUtils = {
  sign(payload: { userId: string }): string {
    return jwt.sign(payload, SECRET, { expiresIn: '7d' });
  },

  verify(token: string): JwtPayload {
    return jwt.verify(token, SECRET) as JwtPayload;
  },

  cookieOptions() {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };
  },
};
