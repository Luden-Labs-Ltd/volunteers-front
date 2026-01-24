import { useQuery } from "@tanstack/react-query";
import { taskResponseApi } from "../api";

export const useTaskResponses = (taskId: string) => {
    return useQuery({
        queryKey: ['task-responses', taskId],
        queryFn: () => taskResponseApi.getTaskResponses(taskId),
        enabled: !!taskId,
        refetchOnWindowFocus: true,
    });
};
