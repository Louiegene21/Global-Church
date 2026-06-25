import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL?.trim() ?? '';
const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL?.trim() ?? '';

export const adminApi = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const publicApi = axios.create({
  baseURL: PUBLIC_URL,
  headers: { 'Content-Type': 'application/json' },
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Kept for backward compat — prefer importing adminApi directly
export const getAxiosInstance = () => adminApi;
export const getPublicAxiosInstance = () => publicApi;
