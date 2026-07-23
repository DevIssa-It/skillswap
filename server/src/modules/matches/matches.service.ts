import { prisma } from '../../infrastructure/database/prisma.client';
import { emitToUser } from '../../infrastructure/socket/socket.handler';
import { Server as SocketIOServer } from 'socket.io';

const USER_SELECT = {
  id: true, name: true, campus: true, email: true,
  skills: true, swapScore: true, swapCount: true,
} as const;

const MATCH_INCLUDE = {
  request: {
    select: {
      offerSkill: true, needSkill: true, category: true, userId: true,
      user: { select: USER_SELECT },
    },
  },
  matchedUser: { select: USER_SELECT },
  rating: { select: { score: true, comment: true } },
} as const;

// Normalize match so `partner` is always the OTHER user (not the caller)
function normalize(match: any, userId: string) {
  const isRequester = match.request.userId === userId;
  const partner = isRequester ? match.matchedUser : match.request.user;
  return {
    id: match.id,
    score: match.score,
    status: match.status,
    contactRevealed: match.contactRevealed,
    createdAt: match.createdAt,
    request: {
      offerSkill: match.request.offerSkill,
      needSkill: match.request.needSkill,
      category: match.request.category,
    },
    matchedUser: partner,
    rating: match.rating ?? null,
  };
}

export const matchesService = {
  async getMyMatches(userId: string) {
    const [asRequester, asMatched] = await Promise.all([
      prisma.match.findMany({
        where: { request: { userId }, status: { not: 'rejected' } },
        include: MATCH_INCLUDE,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.match.findMany({
        where: { matchedUserId: userId, status: { not: 'rejected' } },
        include: MATCH_INCLUDE,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return [...asRequester, ...asMatched]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map(m => normalize(m, userId));
  },

  async accept(matchId: string, userId: string, io?: SocketIOServer) {
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        request: { include: { user: true } },
        matchedUser: true,
      },
    });

    if (!match) throw new Error('NOT_FOUND');

    const isInvolved =
      match.matchedUserId === userId || match.request.userId === userId;
    if (!isInvolved) throw new Error('FORBIDDEN');
    if (match.status !== 'pending') throw new Error('INVALID_STATE');

    const updated = await prisma.match.update({
      where: { id: matchId },
      data: { status: 'accepted', contactRevealed: true },
    });

    if (io) {
      emitToUser(io, match.request.userId, 'match:accepted', {
        matchId,
        acceptedBy: { name: match.matchedUser.name, campus: match.matchedUser.campus },
        contact: match.matchedUser.email,
      });
    }

    return updated;
  },

  async reject(matchId: string, userId: string) {
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: { request: true },
    });
    if (!match) throw new Error('NOT_FOUND');

    const isInvolved =
      match.matchedUserId === userId || match.request.userId === userId;
    if (!isInvolved) throw new Error('FORBIDDEN');

    return prisma.match.update({
      where: { id: matchId },
      data: { status: 'rejected' },
    });
  },

  async complete(matchId: string, userId: string) {
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: { request: true },
    });
    if (!match) throw new Error('NOT_FOUND');

    const isInvolved =
      match.matchedUserId === userId || match.request.userId === userId;
    if (!isInvolved) throw new Error('FORBIDDEN');
    if (match.status !== 'accepted') throw new Error('INVALID_STATE');

    const updated = await prisma.match.update({
      where: { id: matchId },
      data: { status: 'completed' },
    });

    await Promise.all([
      prisma.user.update({
        where: { id: match.request.userId },
        data: { swapCount: { increment: 1 } },
      }),
      prisma.user.update({
        where: { id: match.matchedUserId },
        data: { swapCount: { increment: 1 } },
      }),
    ]);

    return updated;
  },
};
