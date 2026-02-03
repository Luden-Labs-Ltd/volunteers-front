import { useQueryWithErrorHandling } from "@/shared/api/hook/use-query-with-error-handling";
import { taskResponseApi } from "../api";
import { TaskResponse } from "@/entities/task/model/types";
import {QUERY_KEYS} from "@/shared/api/hook/query-keys.ts";

export const useTaskResponses = (taskId: string) => {
    return useQueryWithErrorHandling<TaskResponse[], Error>({
        queryKey: [QUERY_KEYS.TASK_RESPONSES, taskId],
        queryFn: () => taskResponseApi.getTaskResponses(taskId),
        enabled: !!taskId,
        refetchOnWindowFocus: true,
    });
};
