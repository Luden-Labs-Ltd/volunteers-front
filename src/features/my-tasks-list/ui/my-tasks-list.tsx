import { TaskBrief } from "@/entities/task/ui/task-brief";
import {useMyTasksGrouped} from "@/entities/task/hook/useMyTasksGrouped.ts";

export const MyTasksList = () => {
    // const { t } = useTranslation();
    const { groupedTasks } = useMyTasksGrouped();

    const isEmpty = !groupedTasks.waiting.length && !groupedTasks.active.length && !groupedTasks.history.length;
    if (isEmpty) {
        return (
            <div className="flex flex-col items-center justify-center mt-20 text-center px-6">
                <p className="text-lg text-gray-500">You don't have any tasks yet.</p>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-6 px-[20px]">
            {groupedTasks.waiting.length > 0 && (
                <section>
                    <h2 className="text-[18px] font-medium text-[#004573] mb-3">
                        Waiting for volunteers
                    </h2>
                    <div className="flex flex-col gap-3">
                        {groupedTasks.waiting.map(task => (
                            <TaskBrief key={task.id} task={task} onClick={()=>console.log("Ожидают")}/>
                        ))}
                    </div>
                </section>
            )}

            {groupedTasks.active.length > 0 && (
                <section>
                    <h2 className="text-[18px] font-medium text-[#004573] mb-3">
                        Volunteers found
                    </h2>
                    <div className="flex flex-col gap-3">
                        {groupedTasks.active.map(task => (
                            <TaskBrief key={task.id} task={task} onClick={()=>console.log("Выполняются")}/>
                        ))}
                    </div>
                </section>
            )}

            {groupedTasks.history.length > 0 && (
                <section>
                    <h2 className="text-[18px] font-medium text-[#004573] mb-3">
                        Completed
                    </h2>
                    <div className="flex flex-col gap-3">
                        {groupedTasks.history.map(task => (
                            <TaskBrief key={task.id} task={task} onClick={()=>console.log("Готовы")}/>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};
