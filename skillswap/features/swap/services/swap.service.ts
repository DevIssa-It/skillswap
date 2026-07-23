import { apiClient, unwrap } from '@/lib/api';
import { SwapRequest, CreateSwapRequestDto } from '@/types';

export const swapService = {
  async getAll(params?: { category?: string; search?: string }): Promise<SwapRequest[]> {
    const res = await apiClient.get<{ data: SwapRequest[] }>('/requests', { params });
    return unwrap(res);
  },

  async getMy(): Promise<SwapRequest[]> {
    const res = await apiClient.get<{ data: SwapRequest[] }>('/requests/my');
    return unwrap(res);
  },

  async create(dto: CreateSwapRequestDto): Promise<SwapRequest> {
    const res = await apiClient.post<{ data: SwapRequest }>('/requests', dto);
    return unwrap(res);
  },

  async cancel(requestId: string): Promise<void> {
    await apiClient.patch(`/requests/${requestId}/cancel`);
  },
};
