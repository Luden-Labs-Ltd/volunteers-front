import {apiClient} from "@/shared/api";
import {Category} from "@/entities/category/model/types.ts";
import { validateApiResponse, isArray } from '@/shared/lib/validation';

export const categoryApi = {
    getCategories: async (): Promise<Category[]> => {
        const response = await apiClient.request<Category[]>('/categories');
        
        // Валидация ответа
        return validateApiResponse(
            response,
            (data): data is Category[] => isArray(data),
            'Invalid categories response format'
        );
    },
};