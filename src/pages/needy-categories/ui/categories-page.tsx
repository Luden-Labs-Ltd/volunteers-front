import { TaskScroll } from "@/features/task-scroll/ui";
import { useTranslation } from "react-i18next";
import { CategorySelector } from "@/features/select-categories/ui";
// import { PopularTaskScroll } from "@/features/popular-task-scroll/ui";
import { Button, Icon } from "@/shared/ui";
import { useNavigate } from "react-router-dom";
import { useCreateTaskStore } from "@/features/create-task/model/store.ts";
import { useState } from "react";
import { taskApi } from "@/entities/task/api";
import { useMutationWithErrorHandling } from "@/shared/api/hook/use-mutation-with-error-handling";
import { toast } from "sonner";


export const CategoriesPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { categoryId, setCategoryId, setAiGeneratedData, setSkillIds } = useCreateTaskStore();
    const [categorySearchQuery, setCategorySearchQuery] = useState("");
    const [aiPrompt, setAiPrompt] = useState("");

    const { mutate: generateTask, isPending: isGenerating } = useMutationWithErrorHandling({
        mutationFn: async (prompt: string) => {
            return await taskApi.generateTaskFromAi(prompt);
        },
        onSuccess: (data) => {
            // Сохраняем сгенерированные данные в store
            setAiGeneratedData(data);
            // Устанавливаем категорию и навыки из AI
            if (data.categoryId) {
                setCategoryId(data.categoryId);
            }
            if (data.skillIds && data.skillIds.length > 0) {
                setSkillIds(data.skillIds);
            }
            // Переходим на страницу редактирования
            navigate("/needy/details");
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : t("errors.general"));
        },
    });

    const handleAiSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Скрываем клавиатуру
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        // 2. Ждем завершения анимации клавиатуры (300мс) и принудительно сбрасываем скролл
        // Это заставит браузер пересчитать положение fixed элементов
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'auto' });
        }, 300);

        if (!aiPrompt.trim()) {
            toast.error(t("categoriesNeedy.aiPromptRequired") || "Please enter a description");
            return;
        }
        generateTask(aiPrompt.trim());
    };

    const handleNext = () => {
        navigate("/needy/skills");
    };
    const isNextDisabled = isGenerating || !categoryId;

    return (
        <div className="pt-[120px] pb-[calc(150px+env(safe-area-inset-bottom))]">
            {/* Инпут с ИИ + текст */}
            <form onSubmit={handleAiSubmit} className={"flex flex-col justify-center items-center px-[20px]"}>
                <div className="relative w-full max-w-[353px]">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                        <Icon className={"mt-0.5"} iconId={"icon-ai"} />
                    </div>
                    <input
                        type="text"
                        placeholder={t("categoriesNeedy.searchPlaceholder")}
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        disabled={isGenerating}
                        className="
              w-full h-[48px] pl-12 pr-14 rounded-2xl ring-1 ring-gray-200 text-gray-600
              placeholder:text-[#C4C4C4] placeholder:font-normal placeholder:text-[18px]
              focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 shadow-sm text-base
              disabled:opacity-50 disabled:cursor-not-wait
            "
                    />
                    <button
                        type="submit"
                        disabled={isGenerating || !aiPrompt.trim()}
                        className="
              absolute right-2 top-1/2 -translate-y-1/2
              w-10 h-10 rounded-xl
              bg-[#004573] text-white
              flex items-center justify-center
              hover:bg-[#003a5c] active:bg-[#002d47]
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-200
              shadow-sm
            "
                        aria-label={t("categoriesNeedy.sendButton") || "Send"}
                    >
                        {isGenerating ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18.3334 1.66666L9.16669 10.8333M18.3334 1.66666L12.5000 18.3333L9.16669 10.8333M18.3334 1.66666L1.66669 7.49999L9.16669 10.8333"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </button>
                </div>
                <span className={"max-w-[353px] text-[#5B5B5B] text-[16px] font-normal mt-4 leading-[22px] text-center"}>
                    {t("categoriesNeedy.aiPrompt")}
                </span>
            </form>

            {/* Таски */}
            <h2 className={"text-[20px] font-normal mt-6 px-[20px]"}>
                {t("categoriesNeedy.recentTasksTitle")}
            </h2>
            <TaskScroll />

            {/* Категории */}
            <h2 className={"text-[20px] font-normal mt-2 px-[20px]"}>
                {t("categoriesNeedy.categoriesTitle")}
            </h2>
            {/* Инпут для поиска категорий */}
            <div className={"px-[20px] mt-3"}>
                <div className="relative w-full max-w-[353px] mx-auto">
                    <input
                        type="text"
                        placeholder={t("categoriesNeedy.searchCategoriesPlaceholder") || "Search categories..."}
                        value={categorySearchQuery}
                        onChange={(e) => setCategorySearchQuery(e.target.value)}
                        className="
              w-full h-[48px] pl-4 pr-4 rounded-2xl ring-1 ring-gray-200 text-gray-600
              placeholder:text-[#C4C4C4] placeholder:font-normal placeholder:text-[18px]
              focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 shadow-sm text-base
            "
                    />
                </div>
            </div>
            <CategorySelector
                selectedId={categoryId}
                onSelect={setCategoryId}
                searchQuery={categorySearchQuery}
            />

            {/* Выбор комьюнити */}
            {/* <h2 className={"text-[20px] font-normal mt-6 px-[20px]"}>
                {t("categoriesNeedy.mostRequestedTitle")}
            </h2>
            <PopularTaskScroll /> */}

            <div className="fixed bottom-[69px] left-1/2 -translate-x-1/2 z-[50] w-full">
                <div className="w-full bg-white px-5 py-4 z-[0]">
                    <Button
                        onClick={handleNext}
                        disabled={isNextDisabled}
                        className="w-full h-[56px] rounded-xl border border-[#162A43] bg-[#004573] text-white shadow-[3px_3px_0_0_#162A43] text-[20px] font-medium focus:ring-0 focus:ring-offset-0 focus:outline-none"
                    >
                        {t("categoriesNeedy.nextButton")}
                    </Button>
                </div>
            </div>

        </div>
    );
};