import { apiClient } from '@/shared/api';
import { Program } from '../model/types';
import { validateApiResponse, isArray, isObject, validateRequiredFields, isValidUUID } from '@/shared/lib/validation';

export const programApi = {
  getPrograms: async (): Promise<Program[]> => {
    const response = await apiClient.request<Program[]>('/program');
    
    // Валидация ответа
    return validateApiResponse(
      response,
      (data): data is Program[] => isArray(data),
      'Invalid programs response format'
    );
  },
  
  getProgram: async (id: string): Promise<Program> => {
    if (!id || !isValidUUID(id)) {
      throw new Error('Invalid program ID format');
    }
    
    const response = await apiClient.request<Program>(`/program/${id}`);
    
    // Валидация ответа
    return validateApiResponse(
      response,
      (data): data is Program => {
        return isObject(data) && 
               validateRequiredFields(data, ['id', 'name']);
      },
      'Invalid program response format'
    );
  },
};
