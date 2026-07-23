'use client';

import { useState, useEffect, useCallback } from 'react';
import { SwapRequest } from '@/types';
import { swapService } from '../services/swap.service';

export function useSwapRequests(filters?: { category?: string; search?: string }) {
  const [requests, setRequests] = useState<SwapRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await swapService.getAll(filters);
      setRequests(data);
    } catch {
      setError('Gagal memuat swap request');
    } finally {
      setLoading(false);
    }
  }, [filters?.category, filters?.search]); // eslint-disable-line

  useEffect(() => { fetch(); }, [fetch]);

  return { requests, loading, error, refetch: fetch };
}

export function useMySwapRequests() {
  const [requests, setRequests] = useState<SwapRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await swapService.getMy();
      setRequests(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { requests, loading, refetch: fetch };
}
