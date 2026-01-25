import {Button, Icon} from "@/shared/ui";
import {useNavigate, useParams} from "react-router-dom";
import {useTaskResponses} from "@/entities/taskResponses/hook";
import {CandidatesList} from "@/features/task-candidates/ui";
import {useGetTaskById} from "@/entities/task/hook/useGetTaskId";
import {useTranslation} from "react-i18next";

export const AssignVolunteerPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data: responses, isLoading } = useTaskResponses(id || "");
    const { data: task, isLoading: taskLoading } = useGetTaskById(id);

    if (isLoading || taskLoading) return <div>Loading...</div>;
    if (!id) return <div>Task ID is required</div>;

    const taskTitle = task?.title || t('taskResponses.task') || 'Задача';

    return (
        <div className="w-full max-w-[393px] min-h-screen m-auto relative bg-white">
            <div className="fixed flex flex-col top-0 left-0 right-0 z-[50] w-[398px] mx-auto bg-gradient-to-b from-blue-50 to-white pt-16 pb-2 px-[20px]">
                <div className="flex gap-2 items-center">
                <div>
                    <Button
                        icon={<Icon iconId="icon-arrow-back"/>} variant="transition" size="sm"
                        onClick={() => navigate(-1)}
                    />
                </div>
                <h1 className="text-[32px] text-[#004573] font-medium">
                    {taskTitle}
                </h1>
                </div>
                <div className="flex flex-col mt-7">
                <span className={"text-[18px] text-[#004573] font-medium"}>
                    {t('taskResponses.volunteerToHelp') || 'Волонтеры для помощи'}
                </span>
                <span className={"text-[18px] text-[#5B5B5B] font-normal mt-2"}>
                    {t('taskResponses.selectVolunteer') || 'Выберите волонтера для выполнения задачи'}
                </span>
                </div>
            </div>
            <div className="pt-[250px] pb-[90px]">
                <div>
                    {responses && responses.length > 0 ? (
                        responses.map((response) => (
                            <CandidatesList 
                                key={response.id || response.volunteerId} 
                                taskId={id}
                                response={response}
                            />
                        ))
                    ) : (
                        <div className="px-4 py-8 text-center text-gray-500">
                            {t('taskResponses.noResponses') || 'Нет откликов от волонтеров'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}