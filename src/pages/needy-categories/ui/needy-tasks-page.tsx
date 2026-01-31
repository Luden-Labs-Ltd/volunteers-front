import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@/shared/ui";
import { MyTasksList } from "@/features/my-tasks-list/ui/my-tasks-list.tsx";
import userIcon from '@/shared/assets/images/userIcon.webp';

export const NeedyTasksPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleSettingsClick = () => {
        navigate('/needy/settings');
    };

    return (
        <div className="w-full max-w-[393px] min-h-screen m-auto relative bg-white">
            <div className="fixed flex justify-between items-center top-0 left-0 right-0 z-[50] w-[398px] mx-auto bg-gradient-to-b from-blue-50 to-white pt-16 pb-2 px-[20px]">
                <h1 className="text-[28px] text-[#004573] font-medium">
                    {t("tasks.myTasks")}
                </h1>
                <div className="flex items-center gap-2">
                    {/* <Button icon={<Icon iconId={"icon-plus"} />} variant="transition" size="sm" /> */}
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
                <MyTasksList />
            </div>
        </div>
    )
}