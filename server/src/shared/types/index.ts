import { Request } from 'express';

// ─── Auth ──────────────────────────────────────────────────────────────────
export interface AuthRequest extends Request {
  userId?: string;
}

export interface JwtPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

// ─── API Response ─────────────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ─── User ─────────────────────────────────────────────────────────────────
export interface UserPublic {
  id: string;
  name: string;
  campus: string;
  email: string;
  skills: string[];
  swapScore: number;
  swapCount: number;
  createdAt: Date;
}

// ─── SwapRequest ──────────────────────────────────────────────────────────
export interface SwapRequestCreateDto {
  offerSkill: string;
  needSkill: string;
  description?: string;
  timeEstimate?: string;
  category: string;
}

// ─── Match ────────────────────────────────────────────────────────────────
export interface MatchWithScore {
  userId: string;
  requestId: string;
  score: number;
}

// ─── Rating ───────────────────────────────────────────────────────────────
export interface RatingCreateDto {
  matchId: string;
  score: number;
  comment?: string;
}
