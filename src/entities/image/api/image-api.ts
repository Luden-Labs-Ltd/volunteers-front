import { getToken } from '@/shared/lib/auth';
import type { Image } from '../model/types';

// Автоматическое определение API URL
const getApiBaseUrl = (): string => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  if (typeof window === 'undefined') {
    return "https://volunteers-backend-production.up.railway.app";
  }

  const host = window.location.hostname;
  
  if (host.startsWith('192.168.') || host.startsWith('10.') || host.startsWith('172.')) {
    return `http://${host}:4000`;
  }

  if (host === 'localhost' || host === '127.0.0.1') {
    return 'http://localhost:4000';
  }

  return "https://volunteers-backend-production.up.railway.app";
};

export const imageApi = {
  /**
   * Загрузить изображение
   */
  upload: async (file: File, folder?: string): Promise<Image> => {
    const formData = new FormData();
    formData.append('file', file);
    if (folder) {
      formData.append('folder', folder);
    }

    const token = getToken();
    const baseUrl = getApiBaseUrl();
    
    const response = await fetch(`${baseUrl}/image`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `API Error: ${response.statusText}`;
      
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorMessage;
      } catch {
        if (errorText) {
          errorMessage = errorText;
        }
      }

      const error = new Error(errorMessage) as Error & { status?: number };
      error.status = response.status;
      throw error;
    }

    return response.json();
  },
};
