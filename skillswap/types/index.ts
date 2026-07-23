// ─── User ─────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  campus: string;
  email: string;
  skills: string[];
  swapScore: number;
  swapCount: number;
}

// ─── Auth ─────────────────────────────────────────────────────────────────
export interface AuthResult {
  user: User;
  token: string;
}

// ─── Swap Request ─────────────────────────────────────────────────────────
export interface SwapRequest {
  id: string;
  userId: string;
  offerSkill: string;
  needSkill: string;
  description?: string;
  category: string;
  timeEstimate: string;
  status: 'active' | 'matched' | 'completed' | 'cancelled';
  createdAt: string;
  user: Pick<User, 'id' | 'name' | 'campus' | 'swapScore' | 'swapCount'>;
  _count?: { matches: number };
}

export interface CreateSwapRequestDto {
  offerSkill: string;
  needSkill: string;
  description?: string;
  category: string;
  timeEstimate: string;
}

// ─── Match ────────────────────────────────────────────────────────────────
export interface Match {
  id: string;
  score: number;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  contactRevealed: boolean;
  createdAt: string;
  request: {
    offerSkill: string;
    needSkill: string;
    category: string;
  };
  matchedUser: User;
  rating?: { score: number; comment?: string };
}

// ─── Rating ───────────────────────────────────────────────────────────────
export interface CreateRatingDto {
  matchId: string;
  score: number;
  comment?: string;
}

// ─── API ──────────────────────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// ─── Socket Events ────────────────────────────────────────────────────────
export interface MatchFoundEvent {
  matchId: string;
  score: number;
  requester: { name: string; campus: string };
  swap: { offerSkill: string; needSkill: string };
}

export interface MatchAcceptedEvent {
  matchId: string;
  acceptedBy: { name: string; campus: string };
  contact: string;
}

// ─── Toast ────────────────────────────────────────────────────────────────
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}
