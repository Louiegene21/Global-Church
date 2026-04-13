import { getAxiosInstance } from './apiClient';
import type { SermonType } from '../../types';

export const sermonService = {
  getSermons: async (): Promise<SermonType[]> => {
    const api = getAxiosInstance();
    const response = await api.get<any>('/sermons');
    // Normalize data if it's wrapped in a .data property
    return Array.isArray(response.data) ? response.data : response.data?.data || [];
  },

  createSermon: async (formData: FormData): Promise<SermonType> => {
    const api = getAxiosInstance();
    const response = await api.post<SermonType>('/sermons', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateSermon: async (id: number, formData: FormData): Promise<SermonType> => {
    const api = getAxiosInstance();
    // Some APIs use POST with a _method=PUT field for multipart updates
    // but we'll try PUT first unless specified otherwise.
    const response = await api.post<SermonType>(`/sermons/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        _method: 'PUT'
      }
    });
    return response.data;
  },

  deleteSermon: async (id: number): Promise<void> => {
    const api = getAxiosInstance();
    await api.delete(`/sermons/${id}`);
  },
};
