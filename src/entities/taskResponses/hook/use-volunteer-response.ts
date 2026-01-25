import { useQueryWithErrorHandling } from "@/shared/api/hook/use-query-with-error-handling";
import { taskResponseApi } from "../api/task-response-api";
import { TaskResponse } from "@/entities/task/model/types";

/**
 * Хук для получения отклика волонтера на конкретную задачу
 * Использует endpoint /task-responses/volunteer/:volunteerId и фильтрует по taskId
 */
export const useVolunteerResponse = (volunteerId: string | undefined, taskId: string | undefined) => {
    return useQueryWithErrorHandling<TaskResponse | null, Error>({
        queryKey: ['volunteer-responses', volunteerId, taskId],
        queryFn: async () => {
            if (!volunteerId || !taskId) return null;
            const responses = await taskResponseApi.getVolunteerResponses(volunteerId);
            // Находим отклик для конкретной задачи
            return responses.find((response) => response.taskId === taskId) || null;
        },
        enabled: !!volunteerId && !!taskId,
        refetchOnWindowFocus: true,
    });
};
