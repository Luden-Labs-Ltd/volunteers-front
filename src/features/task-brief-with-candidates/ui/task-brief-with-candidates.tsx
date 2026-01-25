import { Task } from "@/entities/task";
import { TaskBrief } from "@/entities/task/ui/task-brief";
import { useTaskResponses } from "@/entities/taskResponses/hook";

export const TaskBriefWithCandidates = ({ task, onClick }: { task: Task, onClick:() => void }) => {
    const { data: responses } = useTaskResponses(task.id);
    const candidatesCount = responses?.length || 0;
    return (
        <div className="relative">
            <TaskBrief
                task={task}
                onClick={onClick}
            />
            {candidatesCount > 0 && (
                <div className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md z-10 border-2 border-white">
                    {candidatesCount}
                </div>
            )}
        </div>
    );
};
