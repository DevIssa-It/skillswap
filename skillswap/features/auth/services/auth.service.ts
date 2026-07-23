import { apiClient, unwrap } from '@/lib/api';
import { authStorage } from '@/lib/auth';
import { AuthResult, User } from '@/types';

export const authService = {
  async register(data: {
    name: string;
    campus: string;
    email: string;
    password: string;
    skills: string[];
  }): Promise<AuthResult> {
    const res = await apiClient.post<{ data: AuthResult }>('/auth/register', data);
    const result = unwrap(res);
    authStorage.setToken(result.token);
    authStorage.setUser(result.user);
    return result;
  },

  async login(data: { email: string; password: string }): Promise<AuthResult> {
    const res = await apiClient.post<{ data: AuthResult }>('/auth/login', data);
    const result = unwrap(res);
    authStorage.setToken(result.token);
    authStorage.setUser(result.user);
    return result;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
    authStorage.clear();
  },

  async getMe(): Promise<User> {
    const res = await apiClient.get<{ data: User }>('/auth/me');
    return unwrap(res);
  },
};
