import { Task, taskApi } from "@/entities/task";
import { QUERY_KEYS } from "@/shared/api/hook/query-keys.ts";
import { useQueryWithErrorHandling } from "@/shared/api/hook/use-query-with-error-handling";
import { validateApiResponse, isArray } from "@/shared/lib/validation";

export const useGetTasks = () => {
  return useQueryWithErrorHandling<Task[]>({
    queryKey: [QUERY_KEYS.TASKS],
    queryFn: async () => {
      const response = await taskApi.getTasks();
      // Валидация ответа
      return validateApiResponse(
        response,
        (data): data is Task[] => isArray(data),
        'Invalid tasks response format'
      );
    },
  });
};