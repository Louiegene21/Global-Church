import { adminApi } from './apiClient';
import type { User } from '../../types';

export interface LoginResponse {
  token: {
    access_token: string;
    token_type: string;
    expires_in?: number;
  };
  user: User;
}

const AUTH_TOKEN_KEY = 'authToken';
const AUTH_USER_KEY = 'authUser';

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await adminApi.post<LoginResponse>('/auth/login', { email, password });

    if (response.data.token?.access_token) {
      localStorage.setItem(AUTH_TOKEN_KEY, response.data.token.access_token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.data.user));
    }

    return response.data;
  },

  logout: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    window.location.href = '/login';
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return false;

    // Decode JWT expiry without an external library
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        authService.logout();
        return false;
      }
    } catch {
      // Non-JWT token — treat as valid if present
    }

    return true;
  },

  getUser: (): User | null => {
    try {
      const stored = localStorage.getItem(AUTH_USER_KEY);
      return stored ? (JSON.parse(stored) as User) : null;
    } catch {
      return null;
    }
  },
};
