import {PopularTaskTile} from "@/entities/task/ui/popular-task-tile";
import {taskApi} from "@/entities/task";
import { useQueryWithErrorHandling } from "@/shared/api/hook/use-query-with-error-handling";
import { validateApiResponse, isArray } from "@/shared/lib/validation";
import { Task } from "@/entities/task/model/types";

export const PopularTaskScroll = () => {
    const { data: popularTask } = useQueryWithErrorHandling<Task[]>({
        queryKey: ['popular-tasks'],
        queryFn: async () => {
            const response = await taskApi.getTasks();
            // Валидация ответа
            return validateApiResponse(
                response,
                (data): data is Task[] => isArray(data),
                'Invalid popular tasks response format'
            );
        },
    });
    return (
        <div dir={"rtl"} className="flex gap-2.5 overflow-x-auto px-[20px] pb-4 mt-3">
            {popularTask?.map((popularTask, index) => (
                <PopularTaskTile key={popularTask.id} popularTask={popularTask} place={index}/>
        ))}
        </div>
    );
}