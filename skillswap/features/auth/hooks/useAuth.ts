'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';
import { authStorage } from '@/lib/auth';
import { authService } from '../services/auth.service';

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(authStorage.getUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const register = useCallback(
    async (data: {
      name: string; campus: string; email: string;
      password: string; skills: string[];
    }) => {
      setLoading(true);
      setError(null);
      try {
        const result = await authService.register(data);
        setUser(result.user);
        router.push('/dashboard');
      } catch (err: unknown) {
        const msg = extractError(err);
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const login = useCallback(
    async (data: { email: string; password: string }) => {
      setLoading(true);
      setError(null);
      try {
        const result = await authService.login(data);
        setUser(result.user);
        router.push('/dashboard');
      } catch (err: unknown) {
        const msg = extractError(err);
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    router.push('/');
  }, [router]);

  return { user, loading, error, register, login, logout, clearError };
}

function extractError(err: unknown): string {
  if (err && typeof err === 'object' && 'response' in err) {
    const axiosErr = err as { response?: { data?: { error?: string } } };
    return axiosErr.response?.data?.error || 'Terjadi kesalahan';
  }
  if (err instanceof Error) return err.message;
  return 'Terjadi kesalahan';
}
