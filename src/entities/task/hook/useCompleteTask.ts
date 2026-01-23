import { useQueryClient } from "@tanstack/react-query";
import { taskApi } from "@/entities/task";
import { QUERY_KEYS } from "@/shared/api/hook/query-keys.ts";
import { useMutationWithErrorHandling } from "@/shared/api/hook/use-mutation-with-error-handling";
import { validateApiResponse, isObject, validateRequiredFields } from "@/shared/lib/validation";
import { Task } from "@/entities/task/model/types";

export const useCompleteTask = () => {
  const queryClient = useQueryClient();

  return useMutationWithErrorHandling<Task, Error, string>({
    mutationFn: async (taskId: string) => {
      if (!taskId) {
        throw new Error('Task ID is required');
      }
      const response = await taskApi.approveCompletion(taskId, { role: 'volunteer' });
      // Валидация ответа
      return validateApiResponse(
        response,
        (data): data is Task => {
          return isObject(data) && 
                 validateRequiredFields(data, ['id', 'status']);
        },
        'Invalid task completion response format'
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
    },
  });
};
