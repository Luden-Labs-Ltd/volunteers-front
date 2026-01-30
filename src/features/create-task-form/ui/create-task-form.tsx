import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/shared/ui";
import { TaskFormCard } from "@/entities/task/ui/task-form-card";
import { taskApi } from "@/entities/task/api";
import { CreateTaskDto, Task } from "@/entities/task/model/types";
import { useGetMe } from "@/entities/user";
import { SelectSkills } from "@/features/selected-skills/ui";
import { createTaskSchema } from "@/entities/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { QUERY_KEYS } from "@/shared/api/hook/query-keys.ts";
import { useMutationWithErrorHandling } from "@/shared/api/hook/use-mutation-with-error-handling";
import { validateApiResponse, isObject, validateRequiredFields } from "@/shared/lib/validation";
import { toast } from "sonner";
import { categoryApi } from "@/entities/category/api";
import { useQueryWithErrorHandling } from "@/shared/api/hook/use-query-with-error-handling";
import { useCreateTaskStore } from "@/features/create-task/model/store.ts";
import { useEffect } from "react";
import { DEFAULT_PROGRAM_ID } from "@/shared/config/constants";

type CreateTaskFormProps = {
    skillsIds: string[];
    categoryId: string;
    onBack: () => void;
    onSuccess: () => void;
};
type CreateTaskFormValues = z.infer<typeof createTaskSchema>;


export const CreateTaskForm = ({ skillsIds, categoryId, onBack, onSuccess }: CreateTaskFormProps) => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const { data: user } = useGetMe();
    const { aiGeneratedData, setAiGeneratedData } = useCreateTaskStore();

    // Получаем категорию для использования её названия как type
    const { data: categories } = useQueryWithErrorHandling({
        queryKey: ['categories'],
        queryFn: async () => categoryApi.getCategories(),
    });

    const selectedCategory = categories?.find(cat => cat.id === categoryId);
    const { mutate, isPending } = useMutationWithErrorHandling<Task, Error, CreateTaskDto>({
        mutationFn: async (data: CreateTaskDto) => {
            // Валидация входных данных
            if (!data.programId || !data.needyId || !data.title || !data.description) {
                throw new Error('Missing required task fields');
            }

            const response = await taskApi.createTask(data);

            // Валидация ответа
            return validateApiResponse(
                response,
                (data): data is Task => {
                    return isObject(data) &&
                        validateRequiredFields(data, ['id', 'programId', 'needyId', 'title', 'description', 'status']);
                },
                'Invalid task creation response format'
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MY_TASKS] });
            setAiGeneratedData(undefined); // Очищаем AI-сгенерированные данные после успешного создания
            onSuccess();
        },
    });
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm<CreateTaskFormValues>({
        resolver: zodResolver(createTaskSchema),
        mode: "onChange",
        defaultValues: {
            title: aiGeneratedData?.title || "",
            description: aiGeneratedData?.description || "",
            firstResponseMode: aiGeneratedData?.firstResponseMode ?? false,
            skillIds: aiGeneratedData?.skillIds && aiGeneratedData.skillIds.length > 0 ? aiGeneratedData.skillIds : skillsIds,
            categoryId: aiGeneratedData?.categoryId || categoryId,
            scheduledDate: undefined,
            scheduledTime: undefined,
        }
    });

    // Обновляем форму при изменении AI-сгенерированных данных
    useEffect(() => {
        if (aiGeneratedData) {
            reset({
                title: aiGeneratedData.title || "",
                description: aiGeneratedData.description || "",
                firstResponseMode: aiGeneratedData.firstResponseMode ?? false,
                skillIds: aiGeneratedData.skillIds && aiGeneratedData.skillIds.length > 0 ? aiGeneratedData.skillIds : skillsIds,
                categoryId: aiGeneratedData.categoryId || categoryId,
                scheduledDate: undefined,
                scheduledTime: undefined,
            });
        }
    }, [aiGeneratedData, reset, skillsIds, categoryId]);

    const onSubmit = async (data: CreateTaskFormValues) => {
        try {
            // Получаем programId из профиля пользователя
            if (!user || user.role !== 'needy') {
                toast.error(t('errors.forbidden'));
                return;
            }

            // Получаем programId из профиля, используем дефолтную программу если отсутствует
            const programId = user.profile?.programId || user.profile?.program?.id || DEFAULT_PROGRAM_ID;

            // Логируем использование дефолтной программы
            if (!user.profile?.programId && !user.profile?.program?.id) {
                console.info('Using default program for task creation:', DEFAULT_PROGRAM_ID);
            }

            // Формируем details с датой и временем, если они указаны
            let details = "";
            if (data.scheduledDate || data.scheduledTime) {
                const dateTimeParts = [];
                if (data.scheduledDate) {
                    dateTimeParts.push(`Дата: ${new Date(data.scheduledDate).toLocaleDateString()}`);
                }
                if (data.scheduledTime) {
                    dateTimeParts.push(`Время: ${data.scheduledTime}`);
                }
                details = dateTimeParts.join(", ");
            }

            // Используем type из AI-сгенерированных данных, если есть
            // Иначе используем название категории или title как fallback
            const taskType = aiGeneratedData?.type || selectedCategory?.name || data.title;

            const payload: CreateTaskDto = {
                programId: programId,
                needyId: user.id,
                type: taskType,
                title: data.title,
                description: data.description,
                details: aiGeneratedData?.details || details || undefined,
                points: aiGeneratedData?.points,
                skillIds: data.skillIds,
                categoryId: data.categoryId,
                firstResponseMode: data.firstResponseMode,
            };
            mutate(payload);
        } catch (error) {
            console.error('Error in onSubmit:', error);
            const errorMessage = error instanceof Error ? error.message : t('errors.general');
            toast.error(errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="h-full pt-[180px] pb-[190px] px-[20px]">
            <TaskFormCard
                register={register}
                control={control}
                errors={errors}
            />

            <h2 className={"text-[20px] font-normal mt-6 mb-3"}>
                {t("taskDetails.selectedSkills")}
            </h2>
            <SelectSkills ids={skillsIds} />
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[50] w-full max-w-[393px]">
                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[50] w-full max-w-[393px] bg-white px-5 py-4">
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full h-[56px] rounded-xl border border-[#162A43] bg-[#004573] text-white shadow-[3px_3px_0_0_#162A43] text-[20px] font-medium"
                    >
                        {t("taskDetails.buttonGoToTasks")}
                    </Button>

                    <Button
                        onClick={onBack}
                        type="button"
                        className="w-full mt-3 h-[56px] rounded-xl bg-white text-[#004573] text-[20px] font-medium active:bg-white hover:bg-white focus:bg-white"
                    >
                        {t("taskDetails.labelAnythingElse")}
                    </Button>
                </div>
            </div>
        </form>
    );
};
