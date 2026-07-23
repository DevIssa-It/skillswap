import { apiClient, unwrap } from '@/lib/api';
import { Match, CreateRatingDto } from '@/types';

export const matchesService = {
  async getMy(): Promise<Match[]> {
    const res = await apiClient.get<{ data: Match[] }>('/matches/my');
    return unwrap(res);
  },

  async accept(matchId: string): Promise<Match> {
    const res = await apiClient.post<{ data: Match }>(`/matches/${matchId}/accept`);
    return unwrap(res);
  },

  async reject(matchId: string): Promise<void> {
    await apiClient.post(`/matches/${matchId}/reject`);
  },

  async complete(matchId: string): Promise<Match> {
    const res = await apiClient.post<{ data: Match }>(`/matches/${matchId}/complete`);
    return unwrap(res);
  },

  async rate(dto: CreateRatingDto): Promise<void> {
    await apiClient.post('/ratings', dto);
  },
};
