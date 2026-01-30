import {TaskTile} from "@/entities/task/ui/task-tile";
import {taskApi} from "@/entities/task";
import { useQueryWithErrorHandling } from "@/shared/api/hook/use-query-with-error-handling";
import { validateApiResponse, isArray } from "@/shared/lib/validation";
import { Task } from "@/entities/task/model/types";

export const TaskScroll = () => {
    const { data: tasks } = useQueryWithErrorHandling<Task[]>({
        queryKey: ['my-recent-tasks'],
        queryFn: async () => {
            const response = await taskApi.getMyTasks();
            // Валидация ответа
            return validateApiResponse(
                response,
                (data): data is Task[] => isArray(data),
                'Invalid my tasks response format'
            );
        },
    });
    return (
        <div
            dir={"rtl"}
            className="flex gap-3 overflow-x-auto px-[20px] mt-3">
            {tasks?.map((task) => (
                <TaskTile key={task.id} task={task} />
            ))}
        </div>
    )
}