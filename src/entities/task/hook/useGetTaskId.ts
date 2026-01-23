import { QUERY_KEYS } from "@/shared/api/hook/query-keys.ts";
import { Task, taskApi } from "@/entities/task";
import { useQueryWithErrorHandling } from "@/shared/api/hook/use-query-with-error-handling";
import { validateApiResponse, isObject, validateRequiredFields } from "@/shared/lib/validation";

export const useGetTaskById = (taskId: string | undefined) => {
  return useQueryWithErrorHandling<Task>({
    queryKey: [QUERY_KEYS.TASKS, taskId],
    queryFn: async () => {
      if (!taskId) {
        throw new Error('Task ID is required');
      }
      const response = await taskApi.getTask(taskId);
      // Валидация ответа - проверяем обязательные поля Task
      return validateApiResponse(
        response,
        (data): data is Task => {
          return isObject(data) && 
                 validateRequiredFields(data, ['id', 'programId', 'needyId', 'type', 'title', 'description', 'status']);
        },
        'Invalid task response format'
      );
    },
    enabled: !!taskId,
  });
};
