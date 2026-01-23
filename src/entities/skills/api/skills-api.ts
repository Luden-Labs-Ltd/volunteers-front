import {apiClient} from "@/shared/api";
import {Skill} from "@/entities/category/model";
import { validateApiResponse, isArray, isObject, validateRequiredFields, isValidUUID } from '@/shared/lib/validation';

export const skillsApi = {
    getSkills: async (): Promise<Skill[]> => {
        const response = await apiClient.request<Skill[]>('/skills');
        
        // Валидация ответа
        return validateApiResponse(
            response,
            (data): data is Skill[] => isArray(data),
            'Invalid skills response format'
        );
    },
    
    getSkill: async (id: string): Promise<Skill> => {
        if (!id || !isValidUUID(id)) {
            throw new Error('Invalid skill ID format');
        }
        
        const response = await apiClient.request<Skill>(`/skills/${id}`);
        
        // Валидация ответа
        return validateApiResponse(
            response,
            (data): data is Skill => {
                return isObject(data) && 
                       validateRequiredFields(data, ['id', 'name']);
            },
            'Invalid skill response format'
        );
    },
};