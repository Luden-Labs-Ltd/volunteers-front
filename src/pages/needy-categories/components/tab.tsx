import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateTaskStore } from "@/features/create-task/model/store";
import { IconTabHelp, IconTabTask } from "@/shared/assets/Icon";

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
        <div className="fixed z-[9999] bottom-0 left-0 right-0 w-full mx-auto pointer-events-none">
            <div className="bg-white border-t border-blue-50 relative pointer-events-auto">
                <div className="px-16 pt-2 pb-6 flex items-center justify-between bg-white relative z-20">
                    <button
                        className="flex flex-col items-center gap-1 group"
                        onClick={handleTasksClick}
                    >
                        <div className={isTasksActive ? "text-[#004573]" : "text-white"}>
                            <IconTabTask isTasksActive={isTasksActive} />
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
                            <IconTabHelp isHelpActive={isHelpActive} />
                        </div>
                        <span className={`text-[16px] font-normal ${isHelpActive
                            ? 'text-[#004573]'
                            : 'text-[#5B5B5B]'
                        }`}>
                            {t("categoriesNeedy.tabRequestHelp")}
                        </span>
                    </button>
                </div>
                <div className="absolute left-0 right-0 bottom-[-200px] h-[200px] bg-white z-10 w-full" />
            </div>
        </div>
    );
};
