import { TaskBrief } from "@/entities/task/ui/task-brief";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {GroupedTasks} from "@/entities/task/hook/useMyTasksGrouped.ts";
import {TaskBriefWithCandidates} from "@/features/task-brief-with-candidates/ui";

type MyTasksListType = {
    groupedTasks: GroupedTasks;
}

const EmptySection = ({ text }: { text: string }) => (
    <div className="w-full py-6 px-5 bg-gray-50 rounded-xl flex items-center justify-center">
        <span className="text-[#5B5B5B] text-sm font-normal text-center">
            {text}
        </span>
    </div>
);

export const MyTasksList = ({groupedTasks}: MyTasksListType ) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const isTotallyEmpty = !groupedTasks.waiting.length && !groupedTasks.active.length && !groupedTasks.history.length;

    if (isTotallyEmpty) {
        return (
            <div className="flex flex-col items-center justify-center mt-20 text-center px-6">
                <p className="text-lg text-gray-500">{t('tasks.empty.my')}</p>
                <p className="text-sm text-gray-400 mt-2">{t("common.createTask")}</p>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-8 px-[20px] pb-10">
            <section>
                <h2 className="text-[18px] font-medium text-[#004573] mb-3 flex items-center gap-2">
                    {t('tasks.waitingForVolunteers')}
                    {groupedTasks.waiting.length > 0 && (
                        <span className="bg-blue-100 text-[#004573] text-xs px-2 py-1 rounded-md">{groupedTasks.waiting.length}</span>
                    )}
                </h2>
                {groupedTasks.waiting.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {groupedTasks.waiting.map(task => (
                            <TaskBriefWithCandidates
                                key={task.id}
                                task={task}
                                onClick={() => navigate(`/needy/tasks/${task.id}/assign`)}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptySection text={t('tasks.empty.waiting') || "No tasks waiting for volunteers"} />
                )}
            </section>
            <section>
                <h2 className="text-[18px] font-medium text-[#004573] mb-3 flex items-center gap-2">
                    {t('tasks.volunteersFound')}
                    {groupedTasks.active.length > 0 && (
                        <span className="bg-green-100 text-[#004573] text-xs px-2 py-1 rounded-md">{groupedTasks.active.length}</span>
                    )}
                </h2>
                {groupedTasks.active.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {groupedTasks.active.map(task => (
                            <TaskBrief
                                key={task.id}
                                task={task}
                                onClick={() => navigate(`/needy/tasks/${task.id}`)}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptySection text={t('tasks.empty.active') || "No active tasks in progress"} />
                )}
            </section>
            <section>
                <h2 className="text-[18px] font-medium text-[#004573] mb-3 flex items-center gap-2">
                    {t('tasks.completed')}
                </h2>
                {groupedTasks.history.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {groupedTasks.history.map(task => (
                            <TaskBrief key={task.id} task={task}/>
                        ))}
                    </div>
                ) : (
                    <EmptySection text={t('tasks.empty.history') || "No completed tasks yet"} />
                )}
            </section>
        </div>
    );
};
