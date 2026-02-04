import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {TabBottomNavigation} from "@/widgets/tab-bottom-navigation/ui";

export const NeedyLayout = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const getHeaderContent = () => {
        const path = location.pathname;
        if (path.includes('/needy/categories')) {
            return { title: t("categoriesNeedy.headerTitle"), subtitle: null };
        }
        if (path.includes('/needy/skills')) {
            return { title: t("categorySkillsView.headerTitle"), subtitle: t("categorySkillsView.headerSubtitle") };
        }
        if (path.includes('/needy/details')) {
            return { title: t("taskDetails.headerTitle"), subtitle: t("taskDetails.headerSubtitle") };
        }
        return { title: "", subtitle: null };
    };
    const header = getHeaderContent();

    return (
        <div className="w-full max-w-[393px] min-h-screen m-auto relative bg-white">
            <div className="fixed top-0 left-0 right-0 z-[50] w-[398px] mx-auto bg-gradient-to-b from-blue-50 to-white pt-16 se-only:pt-10 pb-2 px-[20px]">
                <h1 className="text-[28px] se-only:text-[24px] text-[#004573] font-medium">
                    {header.title}
                </h1>
                {header.subtitle && (
                    <p className="mt-2 text-gray-500 text-[18px] font-normal">
                        {header.subtitle}
                    </p>
                )}
            </div>
            <Outlet />
            <TabBottomNavigation />
        </div>
    );
};
