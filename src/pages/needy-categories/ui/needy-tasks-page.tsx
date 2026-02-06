import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {Button, Icon} from "@/shared/ui";
import {MyTasksList} from "@/features/my-tasks-list/ui/my-tasks-list.tsx";
import {useMyTasksGrouped} from "@/entities/task/hook";
import {QUERY_KEYS} from "@/shared/api/hook/query-keys.ts";
import {useQueryClient} from "@tanstack/react-query";

export const NeedyTasksPage = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { groupedTasks, isRefetching } = useMyTasksGrouped();

    const handleSettingsClick = () => {
        navigate('/needy/settings');
    };
    const handleRefresh = async () => {
        if (isRefetching) return;
        await Promise.all([
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MY_TASKS] }),
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASK_RESPONSES] })
        ]);
    };

    return (
        <div className="w-full max-w-[430px] min-h-screen relative bg-white">
            <div className="fixed flex justify-between items-center top-0 left-0 right-0 z-[50] w-[430px] mx-auto bg-gradient-to-b from-blue-50 to-white pt-16 pb-2 px-[20px]">
                <h1 className="text-[28px] text-[#004573] font-medium">
                    {t("tasks.myTasks")}
                </h1>
                <div className="flex items-center gap-8 relative se-only:right-[-50px]">
                     <Button
                       className="flex items-center justify-center"
                       icon={<Icon className="w-8 h-8 text-deepBlue mb-3 mr-3" iconId={"refreshBtn"} />}
                       variant="transition" size="sm"
                       onClick={handleRefresh}/>
                     <Button
                       className="flex items-center justify-center"
                       icon={<Icon className="w-5 h-5  text-deepBlue" iconId={"iconUser"} />}
                       variant="transition" size="sm"
                       onClick={handleSettingsClick}/>
                </div>
            </div>
            <div className="pt-[120px] pb-[calc(50px+env(safe-area-inset-bottom))] max-w-[393px] ">
                <MyTasksList groupedTasks={groupedTasks}/>
            </div>
        </div>
    )
}