import { useQueryClient } from "@tanstack/react-query";
import { taskApi } from "@/entities/task";
import { QUERY_KEYS } from "@/shared/api/hook/query-keys.ts";
import { useMutationWithErrorHandling } from "@/shared/api/hook/use-mutation-with-error-handling";
import { validateApiResponse, isObject, validateRequiredFields } from "@/shared/lib/validation";
import { Task, TaskApproveRole } from "@/entities/task/model/types";
import { useGetMe } from "@/entities/user";

export const useCompleteTask = () => {
  const queryClient = useQueryClient();
  const { data: user } = useGetMe();

  return useMutationWithErrorHandling<Task, Error, string>({
    mutationFn: async (taskId: string) => {
      if (!taskId) {
        throw new Error('Task ID is required');
      }
      
      if (!user?.role) {
        throw new Error('User role is required');
      }

      const role = user.role === 'needy' ? TaskApproveRole.NEEDY : TaskApproveRole.VOLUNTEER;
      const response = await taskApi.approveCompletion(taskId, { role });
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
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MY_TASKS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POINTS_BALANCE] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POINTS_TRANSACTIONS] });
      // Инвалидируем также данные пользователя, так как там обновляется количество баллов
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
    },
  });
};
