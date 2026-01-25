import { Task, taskApi } from "@/entities/task";
import { QUERY_KEYS } from "@/shared/api/hook/query-keys.ts";
import { useQueryWithErrorHandling } from "@/shared/api/hook/use-query-with-error-handling";
import { validateApiResponse, isArray } from "@/shared/lib/validation";
import { useGetMe } from "@/entities/user/model/hooks/use-get-me";
import { TaskStatus } from "../model/types";

export const useGetTasks = (status?: TaskStatus) => {
  const { data: user } = useGetMe();
  
  // Получаем cityId из профиля волонтера
  const cityId = user?.role === 'volunteer' && user.profile && 'cityId' in user.profile
    ? (user.profile as { cityId?: string }).cityId
    : undefined;

  return useQueryWithErrorHandling<Task[], Error>({
    queryKey: [QUERY_KEYS.TASKS, status, cityId],
    queryFn: async () => {
      const response = await taskApi.getTasks({ 
        status,
        cityId, // Передаем cityId для фильтрации задач по городу
      });
      // Валидация ответа
      return validateApiResponse(
        response,
        (data): data is Task[] => isArray(data),
        'Invalid tasks response format'
      );
    },
  });
};