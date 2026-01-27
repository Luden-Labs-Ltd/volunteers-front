import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useMutationWithErrorHandling } from '@/shared/api/hook/use-mutation-with-error-handling';
import { taskResponseApi as taskResponseApiFromTask } from '@/entities/task/api';
import { TaskResponse } from '@/entities/task/model/types';
import { QUERY_KEYS } from '@/shared/api/hook/query-keys';
import { toast } from 'sonner';

export const useRespondToTask = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutationWithErrorHandling<TaskResponse, Error, string>({
    mutationFn: async (taskId: string) => {
      return taskResponseApiFromTask.respond(taskId);
    },
    onSuccess: (_data, taskId) => {
      // Инвалидируем и принудительно обновляем кэш
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
      queryClient.invalidateQueries({ queryKey: ['task-responses', taskId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MY_TASKS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS, taskId] });
      // Инвалидируем кэш откликов волонтера
      queryClient.invalidateQueries({ queryKey: ['volunteer-responses'] });
      toast.success(t('volunteerTask.respond.success'));
    },
    onError: (error: Error | unknown, taskId) => {
      let message = t('volunteerTask.respond.error');
      
      // Обрабатываем специфичные ошибки
      if (error instanceof Error && error.message) {
        if (error.message.includes('not in the same program')) {
          message = t('volunteerTask.respond.differentProgram');
        } else if (error.message.includes('already responded')) {
          // Если уже откликнулись, обновляем данные, чтобы показать правильный статус
          queryClient.invalidateQueries({ queryKey: ['task-responses', taskId] });
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS, taskId] });
          queryClient.invalidateQueries({ queryKey: ['volunteer-responses'] });
          message = t('volunteerTask.respond.alreadyResponded');
        } else if (error.message.includes('not active')) {
          message = t('volunteerTask.respond.taskNotActive');
        } else {
          message = error.message;
        }
      }
      
      toast.error(message);
    },
  });
};
