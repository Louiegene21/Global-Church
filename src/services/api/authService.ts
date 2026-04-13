import { getAxiosInstance } from './apiClient';

export interface LoginResponse {
  token: {
    access_token: string;
    token_type: string;
    expires_in?: number;
  };
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const adminApi = getAxiosInstance();
    const response = await adminApi.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    
    if (response.data.token?.access_token) {
      localStorage.setItem('authToken', response.data.token.access_token);
      localStorage.setItem('userName', response.data.user?.name || 'Admin');
      localStorage.setItem('isAdmin', 'true');
    }
    
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAdmin');
    window.location.href = '/login';
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};
