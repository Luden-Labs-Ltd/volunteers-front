import { useQueryClient } from '@tanstack/react-query';
import { taskResponseApi } from '../api/task-response-api';
import { useMutationWithErrorHandling } from '@/shared/api/hook/use-mutation-with-error-handling';
import { TaskResponse } from '@/features/respond-to-task/model';
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
        t('taskResponses.approveSuccess') || 'Волонтер одобрен',
        {
          description: t('taskResponses.approveSuccessDescription') || 'Задача назначена волонтеру',
        }
      );
    },
  });
};
