import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useMutationWithErrorHandling } from '@/shared/api/hook/use-mutation-with-error-handling';
import { taskApi } from '@/entities/task/api'; // Путь к твоему файлу taskApi
import { Task } from '@/entities/task/model/types';
import { QUERY_KEYS } from '@/shared/api/hook/query-keys';
import { toast } from 'sonner';

interface AssignVolunteerParams {
    taskId: string;
    volunteerId: string;
}

export const useAssignVolunteer = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutationWithErrorHandling<Task, Error, AssignVolunteerParams>({
        mutationFn: async ({ taskId, volunteerId }) => {
            return taskApi.assignVolunteer(taskId, { volunteerId });
        },
        onSuccess: (_data, { taskId }) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MY_TASKS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS, taskId] });

            toast.success(
                t('task.assignSuccess') || 'Волонтер успешно назначен!',
                {
                    description: t('task.assignSuccessDescription') || 'Задача переведена в статус "В работе"',
                }
            );
        },
        onError: (error: Error | unknown) => {
            let message = t('task.assignError') || 'Ошибка при назначении волонтера';

            if (error instanceof Error && error.message) {
                if (error.message.includes('not found')) {
                    message = t('task.taskNotFound') || 'Задача не найдена';
                } else if (error.message.includes('already assigned')) {
                    message = t('task.alreadyAssigned') || 'Эта задача уже назначена другому волонтеру';
                } else {
                    message = error.message;
                }
            }

            toast.error(message);
        },
    });
};
