import { Task, taskApi } from '@/entities/task';
import { QUERY_KEYS } from '@/shared/api/hook/query-keys.ts';
import { useQueryWithErrorHandling } from '@/shared/api/hook/use-query-with-error-handling';
import { validateApiResponse, isArray } from '@/shared/lib/validation';
import { useGetMe } from '@/entities/user/model/hooks/use-get-me';
import { TaskStatus } from '../model/types';

export const useGetTasks = (status?: TaskStatus) => {
  const { data: user } = useGetMe();

  return useQueryWithErrorHandling<Task[], Error>({
    queryKey: [QUERY_KEYS.TASKS, status],
    queryFn: async () => {
      const isVolunteer = user?.role === 'volunteer';

      const response = isVolunteer
        ? await taskApi.getVolunteerSuitableTasks(status)
        : await taskApi.getTasks({ status });

      // Валидация ответа
      return validateApiResponse(
        response,
        (data): data is Task[] => isArray(data),
        'Invalid tasks response format'
      );
    },
  });
};