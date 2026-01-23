import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateTaskStore } from "@/features/create-task/model/store";
import {IconTabHelp, IconTabTask} from "@/shared/assets/Icon"; // Опционально, для сброса

export const TabsForLayout = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { reset } = useCreateTaskStore();
    const path = location.pathname;

    const isTasksActive = path.includes('/needy/tasks');
    const isHelpActive = path.includes('/needy/categories') || path.includes('/needy/skills');

    if (path.includes('/needy/details')) {
        return null;
    }
    const handleHelpClick = () => {
        reset();
        navigate('/needy/categories');
    };
    const handleTasksClick = () => {
        navigate('/needy/tasks');
    };

    return (
        <div className="fixed z-[1000] bottom-0 left-0 right-0 w-full max-w-[398px] mx-auto bg-white border-t border-blue-50">
            <div className="flex items-center justify-between px-16 pb-4 pt-2">
                <button
                    className="flex flex-col items-center gap-1 group"
                    onClick={handleTasksClick}
                >
                    <div className={isTasksActive ? "text-[#004573]" : "text-white"}>
                        <IconTabTask isTasksActive={isTasksActive}/>
                    </div>
                    <span className={`text-[16px] font-normal ${isTasksActive
                        ? 'text-[#004573]'
                        : 'text-[#5B5B5B] group-hover:text-gray-600'
                    }`}>
                        {t("categoriesNeedy.tabMyTasks")}
                    </span>
                </button>

                <button
                    className="flex flex-col items-center gap-1"
                    onClick={handleHelpClick}
                >
                    <div className={isHelpActive ? "text-[#004573]" : "text-white"}>
                        <IconTabHelp isHelpActive={isHelpActive}/>
                    </div>
                    <span className={`text-[16px] font-normal ${isHelpActive
                        ? 'text-[#004573]'
                        : 'text-[#5B5B5B]'
                    }`}>
                        {t("categoriesNeedy.tabRequestHelp")}
                    </span>
                </button>
            </div>
        </div>
    )
}
