import { apiClient } from '@/shared/api';
import { City } from '../model/types';
import { validateApiResponse, isArray, isObject, validateRequiredFields, isValidUUID } from '@/shared/lib/validation';

export const cityApi = {
  getCities: async (): Promise<City[]> => {
    const response = await apiClient.request<City[]>('/cities');
    // Валидация ответа
    return validateApiResponse(
      response,
      (data): data is City[] => isArray(data) && data.every(city => 
        isObject(city) && 
        validateRequiredFields(city, ['id', 'name', 'latitude', 'longitude']) && 
        isValidUUID(city.id) &&
        typeof city.latitude === 'number' &&
        typeof city.longitude === 'number'
      ),
      'Invalid cities list response format'
    );
  },

  getCity: async (id: string): Promise<City> => {
    if (!id || !isValidUUID(id)) throw new Error('Invalid city ID format');
    const response = await apiClient.request<City>(`/cities/${id}`);
    // Валидация ответа
    return validateApiResponse(
      response,
      (data): data is City => isObject(data) && validateRequiredFields(data, ['id', 'name', 'latitude', 'longitude']),
      'Invalid city details response format'
    );
  },
};
