import { getAxiosInstance } from './apiClient';
import type { SpeakerType } from '../../types';

export const speakerService = {
  getSpeakers: async (): Promise<SpeakerType[]> => {
    const api = getAxiosInstance();
    // Assuming /speakers or /pastors endpoint exists
    const response = await api.get<any>('/pastors');
    // Normalize data if it's wrapped in a .data property
    return Array.isArray(response.data) ? response.data : response.data?.data || [];
  },
};
