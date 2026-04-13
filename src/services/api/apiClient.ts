import axios from 'axios';
import type { AxiosInstance } from 'axios';

let axiosInstance: AxiosInstance | null = null;
const API_URL = import.meta.env.VITE_BASE_URL?.trim() ?? '';

export const getAxiosInstance = (): AxiosInstance => {
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: API_URL,
    });

    axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken'); 
        if (token && !config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  return axiosInstance;
};

let publicAxiosInstance: AxiosInstance | null = null;
const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL?.trim() ?? '';

export const getPublicAxiosInstance = (): AxiosInstance => {
  if (!publicAxiosInstance) {
    publicAxiosInstance = axios.create({
      baseURL: PUBLIC_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    publicAxiosInstance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  return publicAxiosInstance;
};
