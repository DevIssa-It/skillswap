import { prisma } from '../../infrastructure/database/prisma.client';
import { RatingCreateDto } from '../../shared/types';

export const ratingsService = {
  async create(raterId: string, dto: RatingCreateDto) {
    const match = await prisma.match.findUnique({
      where: { id: dto.matchId },
      include: { request: true },
    });

    if (!match) throw new Error('NOT_FOUND');
    if (match.status !== 'completed') throw new Error('NOT_COMPLETED');

    // Determine who is being rated
    const ratedId =
      match.request.userId === raterId ? match.matchedUserId : match.request.userId;

    if (ratedId === raterId) throw new Error('SELF_RATE');

    // Check if already rated
    const existing = await prisma.rating.findFirst({
      where: { matchId: dto.matchId, raterId },
    });
    if (existing) throw new Error('ALREADY_RATED');

    const rating = await prisma.rating.create({
      data: {
        matchId: dto.matchId,
        raterId,
        ratedId,
        score: dto.score,
        comment: dto.comment,
      },
    });

    // Recalculate swap score (average of all ratings received)
    const allRatings = await prisma.rating.findMany({
      where: { ratedId },
      select: { score: true },
    });
    const avg =
      allRatings.reduce((sum, r) => sum + r.score, 0) / allRatings.length;

    await prisma.user.update({
      where: { id: ratedId },
      data: { swapScore: Math.round(avg * 10) / 10 },
    });

    return rating;
  },
};
