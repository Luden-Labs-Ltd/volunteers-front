import { useQueryClient } from '@tanstack/react-query';
import { taskResponseApi } from '../api/task-response-api';
import { useMutationWithErrorHandling } from '@/shared/api/hook/use-mutation-with-error-handling';
import { TaskResponse } from '@/entities/task/model/types';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { QUERY_KEYS } from '@/shared/api/hook/query-keys';

interface ApproveVolunteerParams {
  taskId: string;
  volunteerId: string;
}

export const useApproveVolunteer = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutationWithErrorHandling<TaskResponse, Error, ApproveVolunteerParams>({
    mutationFn: async ({ taskId, volunteerId }) => {
      return taskResponseApi.approveVolunteer(taskId, volunteerId);
    },
    onSuccess: (_data, variables) => {
      // Инвалидируем кэш задач и откликов
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
      queryClient.invalidateQueries({ queryKey: ['task-responses', variables.taskId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MY_TASKS] });
      
      toast.success(
        t('taskResponses.approveSuccess'),
        {
          description: t('taskResponses.approveSuccessDescription'),
        }
      );
    },
    onError: (error: Error | unknown) => {
      let message = t('taskResponses.approveError');
      
      if (error instanceof Error && error.message) {
        if (error.message.includes('not active')) {
          message = t('taskResponses.taskNotActive');
        } else if (error.message.includes('not found')) {
          message = t('taskResponses.responseNotFound');
        } else if (error.message.includes('forbidden') || error.message.includes('not allowed')) {
          message = t('taskResponses.approveForbidden');
        } else {
          message = error.message;
        }
      }
      
      toast.error(message);
    },
  });
};
