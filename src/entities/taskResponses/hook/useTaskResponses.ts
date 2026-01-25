import { useQueryWithErrorHandling } from "@/shared/api/hook/use-query-with-error-handling";
import { taskResponseApi } from "../api";
import { TaskResponse } from "@/features/respond-to-task/model";

export const useTaskResponses = (taskId: string) => {
    return useQueryWithErrorHandling<TaskResponse[], Error>({
        queryKey: ['task-responses', taskId],
        queryFn: () => taskResponseApi.getTaskResponses(taskId),
        enabled: !!taskId,
        refetchOnWindowFocus: true,
    });
};
