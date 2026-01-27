import {TaskBrief} from "@/entities/task/ui/task-brief";
import {useMyTasksGrouped} from "@/entities/task/hook/useMyTasksGrouped.ts";
import {TaskBriefWithCandidates} from "@/features/task-brief-with-candidates/ui";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const MyTasksList = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { groupedTasks } = useMyTasksGrouped();
    const isEmpty = !groupedTasks.waiting.length && !groupedTasks.active.length && !groupedTasks.history.length;
    if (isEmpty) {
        return (
            <div className="flex flex-col items-center justify-center mt-20 text-center px-6">
                <p className="text-lg text-gray-500">{t('tasks.empty.my')}</p>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-6 px-[20px]">
            {groupedTasks.waiting.length > 0 && (
                <section>
                    <h2 className="text-[18px] font-medium text-[#004573] mb-3">
                        {t('tasks.waitingForVolunteers')}
                    </h2>
                    <div className="flex flex-col gap-3">
                        {groupedTasks.waiting.map(task => (
                            <TaskBriefWithCandidates key={task.id} task={task} onClick={() => navigate(`/needy/tasks/${task.id}/assign`)}/>
                        ))}
                    </div>
                </section>
            )}

            {groupedTasks.active.length > 0 && (
                <section>
                    <h2 className="text-[18px] font-medium text-[#004573] mb-3">
                        {t('tasks.volunteersFound')}
                    </h2>
                    <div className="flex flex-col gap-3">
                        {groupedTasks.active.map(task => (
                            <TaskBrief key={task.id} task={task} onClick={() => navigate(`/needy/tasks/${task.id}`)}/>
                        ))}
                    </div>
                </section>
            )}

            {groupedTasks.history.length > 0 && (
                <section>
                    <h2 className="text-[18px] font-medium text-[#004573] mb-3">
                        {t('tasks.completed')}
                    </h2>
                    <div className="flex flex-col gap-3">
                        {groupedTasks.history.map(task => (
                            <TaskBrief key={task.id} task={task}/>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};
