import { apiClient } from '@/shared/api';
import { TaskResponse } from "@/entities/task/model/types";
import { validateApiResponse, isObject, validateRequiredFields } from '@/shared/lib/validation';

export interface ApproveVolunteerDto {
  volunteerId: string;
}

export const taskResponseApi = {
    getTaskResponses: async (taskId: string): Promise<TaskResponse[]> => {
        if (!taskId) throw new Error('taskId is required');
        const response = await apiClient.request<TaskResponse[]>(`/task-responses/task/${taskId}`);
        return validateApiResponse(
            response,
            (data): data is TaskResponse[] => Array.isArray(data),
            'Invalid task responses response format'
        );
    },

    getVolunteerResponses: async (volunteerId: string): Promise<TaskResponse[]> => {
        if (!volunteerId) throw new Error('volunteerId is required');
        const response = await apiClient.request<TaskResponse[]>(`/task-responses/volunteer/${volunteerId}`);
        return validateApiResponse(
            response,
            (data): data is TaskResponse[] => Array.isArray(data),
            'Invalid volunteer responses response format'
        );
    },

    approveVolunteer: async (taskId: string, volunteerId: string): Promise<TaskResponse> => {
        if (!taskId) throw new Error('taskId is required');
        if (!volunteerId) throw new Error('volunteerId is required');
        
        // API возвращает объект { taskResponse, task }
        const response = await apiClient.request<{ taskResponse: TaskResponse; task: unknown }>(
            `/task-responses/task/${taskId}/approve`,
            {
                method: 'POST',
                body: JSON.stringify({ volunteerId }),
            }
        );
        
        // Валидируем структуру ответа и извлекаем taskResponse
        if (!isObject(response) || !('taskResponse' in response)) {
            throw new Error('Invalid approve volunteer response format: missing taskResponse');
        }
        
        const taskResponse = response.taskResponse;
        return validateApiResponse(
            taskResponse,
            (data): data is TaskResponse => isObject(data) && validateRequiredFields(data, ['id', 'taskId', 'volunteerId', 'status']),
            'Invalid taskResponse in approve volunteer response'
        );
    },

    rejectVolunteer: async (taskId: string, volunteerId: string): Promise<TaskResponse> => {
        if (!taskId) throw new Error('taskId is required');
        if (!volunteerId) throw new Error('volunteerId is required');
        
        // API возвращает void (пустой ответ) при успешном отклонении
        const response = await apiClient.request<TaskResponse | null>(
            `/task-responses/task/${taskId}/reject`,
            {
                method: 'POST',
                body: JSON.stringify({ volunteerId }),
            }
        );
        
        // Если ответ пустой (null), создаем минимальный объект TaskResponse для совместимости
        if (!response) {
            return {
                id: '',
                taskId,
                volunteerId,
                programId: '',
                status: 'rejected' as const,
                createdAt: new Date(),
            } as TaskResponse;
        }
        
        return validateApiResponse(
            response,
            (data): data is TaskResponse => isObject(data) && validateRequiredFields(data, ['id', 'taskId', 'volunteerId', 'status']),
            'Invalid reject volunteer response format'
        );
    },
};
