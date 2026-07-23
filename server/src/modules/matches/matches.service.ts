import { prisma } from '../../infrastructure/database/prisma.client';
import { emitToUser } from '../../infrastructure/socket/socket.handler';
import { Server as SocketIOServer } from 'socket.io';

const MATCH_INCLUDE = {
  request: {
    select: { offerSkill: true, needSkill: true, category: true },
  },
  matchedUser: {
    select: {
      id: true, name: true, campus: true, email: true,
      skills: true, swapScore: true, swapCount: true,
    },
  },
  rating: { select: { score: true, comment: true } },
} as const;

export const matchesService = {
  async getMyMatches(userId: string) {
    // Get matches where the logged-in user is either:
    // (a) the requester (via request.userId === userId)
    // (b) the matched user (matchedUserId === userId)
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

    return [...asRequester, ...asMatched].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
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

    // Only the matched user can accept
    if (match.matchedUserId !== userId) throw new Error('FORBIDDEN');
    if (match.status !== 'pending') throw new Error('INVALID_STATE');

    const updated = await prisma.match.update({
      where: { id: matchId },
      data: { status: 'accepted', contactRevealed: true },
    });

    // Notify requester that their match was accepted
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
    const match = await prisma.match.findUnique({ where: { id: matchId } });
    if (!match) throw new Error('NOT_FOUND');
    if (match.matchedUserId !== userId) throw new Error('FORBIDDEN');

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

    // Either party can mark as complete
    const isInvolved =
      match.matchedUserId === userId || match.request.userId === userId;
    if (!isInvolved) throw new Error('FORBIDDEN');
    if (match.status !== 'accepted') throw new Error('INVALID_STATE');

    const updated = await prisma.match.update({
      where: { id: matchId },
      data: { status: 'completed' },
    });

    // Update swap counts for both users
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
