import { apiClient } from '@/shared/api';
import { TaskResponse } from "@/features/respond-to-task/model";

export const taskResponseApi = {
    getTaskResponses: async (taskId: string): Promise<TaskResponse[]> => {
        if (!taskId) throw new Error('TaskId is required');
        return apiClient.request<TaskResponse[]>(`/task-responses/task/${taskId}`);
    },
};
