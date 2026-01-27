import {useQueryClient} from "@tanstack/react-query";
import {useMutationWithErrorHandling} from "@/shared/api/hook/use-mutation-with-error-handling.ts";
import {Task, taskApi} from "@/entities/task";
import {QUERY_KEYS} from "@/shared/api/hook/query-keys.ts";

export const useCancelAssignment = () => {
    const queryClient = useQueryClient();

    return useMutationWithErrorHandling<Task, Error, string>({
        mutationFn: async (taskId: string) => {
            return await taskApi.cancelAssignment(taskId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MY_TASKS] });
        },
    });
};
