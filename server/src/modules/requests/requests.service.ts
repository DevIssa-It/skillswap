import { prisma } from '../../infrastructure/database/prisma.client';
import { emitToUser } from '../../infrastructure/socket/socket.handler';
import { Server as SocketIOServer } from 'socket.io';
import { SwapRequestCreateDto } from '../../shared/types';

// ─── Compatibility Scoring Algorithm ──────────────────────────────────────
// Score breakdown (max 100):
//   +50 pts → direct mutual match (A offers what B needs AND B offers what A needs)
//   +20 pts → same campus (local community priority)
//   +15 pts → compatible time estimates
//   +15 pts → reputation score (swapScore of matched user, normalized)

interface MatchCandidate {
  requestId: string;
  userId: string;
  userName: string;
  userCampus: string;
  userSwapScore: number;
  offerSkill: string;
  needSkill: string;
  timeEstimate: string;
  score: number;
}

async function computeMatches(
  newRequest: {
    id: string;
    userId: string;
    offerSkill: string;
    needSkill: string;
    category: string;
    timeEstimate: string;
    user: { campus: string; swapScore: number };
  }
): Promise<MatchCandidate[]> {
  // Find all ACTIVE requests where there's a potential mutual match
  // i.e., the other request offers what we need OR needs what we offer
  const candidates = await prisma.swapRequest.findMany({
    where: {
      status: 'active',
      userId: { not: newRequest.userId }, // exclude own requests
      id: { not: newRequest.id },
    },
    include: {
      user: true,
    },
  });

  const scored: MatchCandidate[] = [];

  for (const candidate of candidates) {
    let score = 0;

    // +50: Direct mutual match (A.offer === B.need AND A.need === B.offer)
    const isDirect =
      candidate.offerSkill === newRequest.needSkill &&
      candidate.needSkill === newRequest.offerSkill;
    if (isDirect) {
      score += 50;
    } else {
      // Partial: one side matches → still show but lower score
      if (candidate.offerSkill === newRequest.needSkill) score += 25;
      if (candidate.needSkill === newRequest.offerSkill) score += 15;
    }

    // Skip if no overlap at all
    if (score === 0) continue;

    // +20: Same campus
    if (candidate.user.campus === newRequest.user.campus) {
      score += 20;
    }

    // +15: Compatible time estimate
    if (candidate.timeEstimate === newRequest.timeEstimate) {
      score += 15;
    }

    // +15: Reputation (normalized: swapScore/5 * 15)
    const reputationBonus = Math.min((candidate.user.swapScore / 5) * 15, 15);
    score += reputationBonus;

    scored.push({
      requestId: candidate.id,
      userId: candidate.userId,
      userName: candidate.user.name,
      userCampus: candidate.user.campus,
      userSwapScore: candidate.user.swapScore,
      offerSkill: candidate.offerSkill,
      needSkill: candidate.needSkill,
      timeEstimate: candidate.timeEstimate,
      score: Math.min(Math.round(score), 100),
    });
  }

  // Sort by score descending, return top 10
  return scored.sort((a, b) => b.score - a.score).slice(0, 10);
}

export const requestsService = {
  async create(userId: string, dto: SwapRequestCreateDto, io?: SocketIOServer) {
    const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

    const newRequest = await prisma.swapRequest.create({
      data: {
        userId,
        offerSkill: dto.offerSkill,
        needSkill: dto.needSkill,
        description: dto.description,
        timeEstimate: dto.timeEstimate ?? '1_day',
        category: dto.category,
      },
      include: { user: true },
    });

    // Run matching algorithm in background (non-blocking)
    setImmediate(async () => {
      const candidates = await computeMatches(newRequest);

      for (const candidate of candidates) {
        // Create match record
        const match = await prisma.match.create({
          data: {
            requestId: newRequest.id,
            matchedUserId: candidate.userId,
            score: candidate.score,
          },
        });

        // Notify matched user via WebSocket
        if (io) {
          emitToUser(io, candidate.userId, 'match:found', {
            matchId: match.id,
            score: candidate.score,
            requester: { name: user.name, campus: user.campus },
            swap: {
              offerSkill: newRequest.offerSkill,
              needSkill: newRequest.needSkill,
            },
          });
        }
      }
    });

    return newRequest;
  },

  async getAll(filters: { category?: string; search?: string }) {
    return prisma.swapRequest.findMany({
      where: {
        status: 'active',
        ...(filters.category && filters.category !== 'Semua'
          ? { category: filters.category }
          : {}),
        ...(filters.search
          ? {
              OR: [
                { offerSkill: { contains: filters.search } },
                { needSkill: { contains: filters.search } },
                { user: { name: { contains: filters.search } } },
                { user: { campus: { contains: filters.search } } },
              ],
            }
          : {}),
      },
      include: {
        user: {
          select: {
            id: true, name: true, campus: true,
            swapScore: true, swapCount: true,
          },
        },
        _count: { select: { matches: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  },

  async getMyRequests(userId: string) {
    return prisma.swapRequest.findMany({
      where: { userId },
      include: {
        _count: { select: { matches: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  async cancel(requestId: string, userId: string) {
    const req = await prisma.swapRequest.findUnique({ where: { id: requestId } });
    if (!req) throw new Error('NOT_FOUND');
    if (req.userId !== userId) throw new Error('FORBIDDEN');

    return prisma.swapRequest.update({
      where: { id: requestId },
      data: { status: 'cancelled' },
    });
  },
};
