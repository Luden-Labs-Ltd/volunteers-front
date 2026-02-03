import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {Button, Icon} from "@/shared/ui";
import {MyTasksList} from "@/features/my-tasks-list/ui/my-tasks-list.tsx";

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
                <div className="flex items-center gap-2 relative se-only:right-6">
                     <Button
                       className="flex items-center justify-center"
                       icon={<Icon className="w-5 h-5  text-deepBlue" iconId={"refreshBtn"} />}
                       variant="transition" size="sm"
                       onClick={()=>{}}/>
                     <Button
                       className="flex items-center justify-center"
                       icon={<Icon className="w-5 h-5  text-deepBlue" iconId={"iconUser"} />}
                       variant="transition" size="sm"
                       onClick={handleSettingsClick}/>
                </div>
            </div>
            <div className="pt-[120px] pb-[calc(50px+env(safe-area-inset-bottom))]">
                <MyTasksList />
            </div>
        </div>
    )
}