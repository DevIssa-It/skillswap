import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

import { authRouter } from './modules/auth/auth.routes';
import { requestsRouter } from './modules/requests/requests.routes';
import { matchesRouter } from './modules/matches/matches.routes';
import { ratingsRouter } from './modules/ratings/ratings.routes';
import { statsRouter } from './modules/stats/stats.routes';
import { setupSocketHandlers } from './infrastructure/socket/socket.handler';

// ─── App Setup ────────────────────────────────────────────────────────────────
const app = express();
const httpServer = createServer(app);

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Support multiple origins separated by comma, e.g. "http://localhost:3000,https://skillswap-ruby-pi.vercel.app"
const allowedOrigins = FRONTEND_URL.split(',').map((o) => o.trim());

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (e.g. curl, Postman, mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
};

const PORT = parseInt(process.env.PORT || '3001', 10);

// ─── Socket.io ────────────────────────────────────────────────────────────────
export const io = new SocketIOServer(httpServer, {
  cors: { origin: allowedOrigins, credentials: true },
});
setupSocketHandlers(io);

// ─── Rate Limiting (Harden) ───────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests, please try again later.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many auth attempts, please try again later.' },
});

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/api', globalLimiter);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Module Routes ────────────────────────────────────────────────────────────
app.use('/api/auth', authLimiter, authRouter);
app.use('/api/requests', requestsRouter);
app.use('/api/matches', matchesRouter);
app.use('/api/ratings', ratingsRouter);
app.use('/api/stats', statsRouter);

// ─── 404 Fallback ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// ─── Start ────────────────────────────────────────────────────────────────────
httpServer.listen(PORT, () => {
  console.log(`\n🚀 SkillSwap API  →  http://localhost:${PORT}`);
  console.log(`📡 Socket.io      →  ready`);
  console.log(`🌐 CORS origins   →  ${allowedOrigins.join(', ')}\n`);
});

export default app;
