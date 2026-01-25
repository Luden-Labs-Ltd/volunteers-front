import { useQueryClient } from '@tanstack/react-query';
import { taskResponseApi } from '../api/task-response-api';
import { useMutationWithErrorHandling } from '@/shared/api/hook/use-mutation-with-error-handling';
import { TaskResponse } from '@/entities/task/model/types';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { QUERY_KEYS } from '@/shared/api/hook/query-keys';

interface RejectVolunteerParams {
  taskId: string;
  volunteerId: string;
}

export const useRejectVolunteer = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutationWithErrorHandling<TaskResponse, Error, RejectVolunteerParams>({
    mutationFn: async ({ taskId, volunteerId }) => {
      return taskResponseApi.rejectVolunteer(taskId, volunteerId);
    },
    onSuccess: (_data, variables) => {
      // Инвалидируем кэш задач и откликов
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
      queryClient.invalidateQueries({ queryKey: ['task-responses', variables.taskId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MY_TASKS] });
      
      toast.success(
        t('taskResponses.rejectSuccess') || 'Волонтер отклонен',
        {
          description: t('taskResponses.rejectSuccessDescription') || 'Отклик волонтера отклонен',
        }
      );
    },
    onError: (error: any) => {
      let message = t('taskResponses.rejectError') || 'Ошибка при отклонении волонтера';
      
      if (error?.message) {
        if (error.message.includes('not found')) {
          message = t('taskResponses.responseNotFound') || 'Отклик не найден';
        } else if (error.message.includes('forbidden') || error.message.includes('not allowed')) {
          message = t('taskResponses.rejectForbidden') || 'У вас нет прав для отклонения этого волонтера';
        } else {
          message = error.message;
        }
      }
      
      toast.error(message);
    },
  });
};
