'use client';

import { useState, useEffect, useCallback } from 'react';
import { Match } from '@/types';
import { matchesService } from '../services/matches.service';

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await matchesService.getMy();
      setMatches(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const accept = useCallback(async (matchId: string) => {
    setActionLoading(matchId);
    try {
      await matchesService.accept(matchId);
      await fetch();
    } finally {
      setActionLoading(null);
    }
  }, [fetch]);

  const reject = useCallback(async (matchId: string) => {
    setActionLoading(matchId);
    try {
      await matchesService.reject(matchId);
      await fetch();
    } finally {
      setActionLoading(null);
    }
  }, [fetch]);

  const complete = useCallback(async (matchId: string) => {
    setActionLoading(matchId);
    try {
      await matchesService.complete(matchId);
      await fetch();
    } finally {
      setActionLoading(null);
    }
  }, [fetch]);

  const rate = useCallback(async (matchId: string, score: number, comment?: string) => {
    await matchesService.rate({ matchId, score, comment });
    await fetch();
  }, [fetch]);

  return {
    matches,
    loading,
    actionLoading,
    accept,
    reject,
    complete,
    rate,
    refetch: fetch,
  };
}
