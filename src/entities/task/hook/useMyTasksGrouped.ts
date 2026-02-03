import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { taskApi } from "@/entities/task/api";
import { Task } from "@/entities/task/model/types";
import { QUERY_KEYS } from "@/shared/api/hook/query-keys";

enum TaskStatus {
    ACTIVE = 'active',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
}

export interface GroupedTasks {
    waiting: Task[];
    active: Task[];
    history: Task[];
}

export const useMyTasksGrouped = () => {
    const { data: tasks, isLoading, isError, error, refetch, isRefetching } = useQuery({
        queryKey: [QUERY_KEYS.MY_TASKS],
        queryFn: taskApi.getMyTasks,
    });

    const groupedTasks = useMemo<GroupedTasks>(() => {
        const result: GroupedTasks = {
            waiting: [],
            active: [],
            history: []
        };

        if (!tasks) return result;

        tasks.forEach((task) => {
            const status = task.status.toLowerCase();

            switch (status) {
                case TaskStatus.ACTIVE:
                    result.waiting.push(task);
                    break;

                case TaskStatus.IN_PROGRESS:
                    result.active.push(task);
                    break;

                case TaskStatus.COMPLETED:
                case TaskStatus.CANCELLED:
                    result.history.push(task);
                    break;

                default:
                    console.warn('Unknown status:', status);
                    result.history.push(task);
            }
        });

        return result;
    }, [tasks]);

    return { groupedTasks, isLoading, isError, error, refetch, isRefetching };
};
