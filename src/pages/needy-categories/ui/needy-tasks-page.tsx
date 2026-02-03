import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {Button, Icon, IconButton} from "@/shared/ui";
import { MyTasksList } from "@/features/my-tasks-list/ui/my-tasks-list.tsx";
import userIcon from '@/shared/assets/images/userIcon.webp';
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
        <div className="w-full max-w-[393px] min-h-screen m-auto relative bg-white">
            <div className="fixed flex justify-between items-center top-0 left-0 right-0 z-[50] w-[398px] mx-auto bg-gradient-to-b from-blue-50 to-white pt-16 pb-2 px-[20px]">
                <h1 className="text-[28px] text-[#004573] font-medium">
                    {t("tasks.myTasks")}
                </h1>
                <div className="flex items-center gap-10 relative se-only:right-6">
                    {/*заменить иконку на иконку рефреша*/}
                     <Button icon={<Icon iconId={"icon-plus"} />} variant="transition" size="sm" onClick={handleRefresh}  disabled={isRefetching}/>
                    <IconButton
                        className="w-8 h-8 rounded-lg drop-shadow-[2px_2px_0_#004573]"
                        variant="ghost"
                        aria-label={t('common.profile')}
                        icon={
                            <img
                                src={userIcon}
                                alt={t('common.profile')}
                                className="w-full h-full object-cover"
                            />
                        }
                        onClick={handleSettingsClick}
                    />
                </div>
            </div>
            <div className="pt-[120px] pb-[calc(50px+env(safe-area-inset-bottom))]">
                <MyTasksList groupedTasks={groupedTasks}/>
            </div>
        </div>
    )
}