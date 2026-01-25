import { apiClient } from '@/shared/api';
import { TaskResponse } from "@/features/respond-to-task/model";
import { validateApiResponse, isObject, validateRequiredFields, isValidUUID } from '@/shared/lib/validation';

export interface ApproveVolunteerDto {
  volunteerId: string;
}

export const taskResponseApi = {
    getTaskResponses: async (taskId: string): Promise<TaskResponse[]> => {
        if (!taskId || !isValidUUID(taskId)) throw new Error('Invalid taskId format');
        const response = await apiClient.request<TaskResponse[]>(`/task-responses/task/${taskId}`);
        return validateApiResponse(
            response,
            (data): data is TaskResponse[] => Array.isArray(data),
            'Invalid task responses response format'
        );
    },

    approveVolunteer: async (taskId: string, volunteerId: string): Promise<TaskResponse> => {
        if (!taskId || !isValidUUID(taskId)) throw new Error('Invalid taskId format');
        if (!volunteerId || !isValidUUID(volunteerId)) throw new Error('Invalid volunteerId format');
        
        const response = await apiClient.request<TaskResponse>(
            `/task-responses/task/${taskId}/approve`,
            {
                method: 'POST',
                body: JSON.stringify({ volunteerId }),
            }
        );
        
        return validateApiResponse(
            response,
            (data): data is TaskResponse => isObject(data) && validateRequiredFields(data, ['id', 'taskId', 'volunteerId', 'status']),
            'Invalid approve volunteer response format'
        );
    },

    rejectVolunteer: async (taskId: string, volunteerId: string): Promise<TaskResponse> => {
        if (!taskId || !isValidUUID(taskId)) throw new Error('Invalid taskId format');
        if (!volunteerId || !isValidUUID(volunteerId)) throw new Error('Invalid volunteerId format');
        
        const response = await apiClient.request<TaskResponse>(
            `/task-responses/task/${taskId}/reject`,
            {
                method: 'POST',
                body: JSON.stringify({ volunteerId }),
            }
        );
        
        return validateApiResponse(
            response,
            (data): data is TaskResponse => isObject(data) && validateRequiredFields(data, ['id', 'taskId', 'volunteerId', 'status']),
            'Invalid reject volunteer response format'
        );
    },
};
