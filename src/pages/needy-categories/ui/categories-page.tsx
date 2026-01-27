import { TaskScroll } from "@/features/task-scroll/ui";
import {useTranslation} from "react-i18next";
import {CategorySelector} from "@/features/select-categories/ui";
import {PopularTaskScroll} from "@/features/popular-task-scroll/ui";
import {Button, Icon} from "@/shared/ui";
import {useNavigate} from "react-router-dom";
import {useCreateTaskStore} from "@/features/create-task/model/store.ts";


export const CategoriesPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { categoryId, setCategoryId } = useCreateTaskStore();
    const handleNext = () => {
        navigate("/needy/skills");
    };
    return (
        <div className="pt-[120px] pb-[calc(150px+env(safe-area-inset-bottom))]">
            {/* Инпут с ИИ + текст */}
            <div className={"flex flex-col justify-center items-center px-[20px]"}>
                <div className="relative w-full max-w-[353px]">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Icon className={"mt-0.5"} iconId={"icon-ai"}/>
                    </div>
                    <input
                        type="text"
                        placeholder={t("categoriesNeedy.searchPlaceholder")}
                        className="
              w-full h-[48px] pl-12 pr-4 rounded-2xl ring-1 ring-gray-200 text-gray-600
              placeholder:text-[#C4C4C4] placeholder:font-normal placeholder:text-[18px]
              focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 shadow-sm text-base
            "
                    />
                </div>
                <span className={"max-w-[353px] text-[#5B5B5B] text-[16px] font-normal mt-4 leading-[22px]"}>
                    {t("categoriesNeedy.aiPrompt")}
                </span>
            </div>

            {/* Таски */}
            <h2 className={"text-[20px] font-normal mt-6 px-[20px]"}>
                {t("categoriesNeedy.recentTasksTitle")}
            </h2>
            <TaskScroll />

            {/* Категории */}
            <h2 className={"text-[20px] font-normal mt-6 px-[20px]"}>
                {t("categoriesNeedy.categoriesTitle")}
            </h2>
            <CategorySelector
                selectedId={categoryId}
                onSelect={setCategoryId}
            />

            {/* Выбор комьюнити */}
            <h2 className={"text-[20px] font-normal mt-6 px-[20px]"}>
                {t("categoriesNeedy.mostRequestedTitle")}
            </h2>
            <PopularTaskScroll />

            <div className="fixed bottom-[69px] left-1/2 -translate-x-1/2 z-[50] w-full">
                <div className="w-full bg-white px-5 py-4 z-[0]">
                    <Button
                        onClick={handleNext}
                        className="w-full h-[56px] rounded-xl border border-[#162A43] bg-[#004573] text-white shadow-[3px_3px_0_0_#162A43] text-[20px] font-medium focus:ring-0 focus:ring-offset-0 focus:outline-none"
                    >
                        {t("categoriesNeedy.nextButton")}
                    </Button>
                </div>
            </div>

        </div>
    );
};