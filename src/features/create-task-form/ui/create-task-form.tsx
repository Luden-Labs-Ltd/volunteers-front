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
import { createTaskSchema } from "@/pages/needy-categories/model/schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { QUERY_KEYS } from "@/shared/api/hook/query-keys.ts";
import { useMutationWithErrorHandling } from "@/shared/api/hook/use-mutation-with-error-handling";
import { validateApiResponse, isObject, validateRequiredFields } from "@/shared/lib/validation";
import { toast } from "sonner";

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
    const { data: user } = useGetMe()
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
            onSuccess();
        },
    });
    const { register, control, handleSubmit, formState: { errors } } = useForm<CreateTaskFormValues>({
        resolver: zodResolver(createTaskSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            description: "",
            firstResponseMode: false,
            skillIds: skillsIds,
            categoryId: categoryId,
            scheduledDate: undefined,
            scheduledTime: undefined,
        }
    });

    const onSubmit = async (data: CreateTaskFormValues) => {
        try {
            // Получаем programId из профиля пользователя
            if (!user || user.role !== 'needy') {
                toast.error(t('errors.forbidden') || 'Только нуждающиеся могут создавать задачи');
                return;
            }

            // Получаем programId из профиля (может быть напрямую или через program объект)
            const programId = user.profile?.programId || user.profile?.program?.id;

            if (!programId) {
                const errorMessage = t('errors.programIdRequired') || 'Program ID is required for needy users. Please contact administrator to assign a program to your account.';
                console.error('Missing programId for needy user:', {
                    userId: user.id,
                    profile: user.profile,
                });
                toast.error(errorMessage);
                return;
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

            const payload: CreateTaskDto = {
                programId: programId,
                needyId: user.id,
                type: data.title,
                title: data.title,
                description: data.description,
                details: details,
                skillIds: data.skillIds,
                categoryId: data.categoryId,
                firstResponseMode: data.firstResponseMode,
            };
            mutate(payload);
        } catch (error) {
            console.error('Error in onSubmit:', error);
            const errorMessage = error instanceof Error ? error.message : t('errors.general') || 'Произошла ошибка';
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
            <div className="fixed z-[1000] bottom-0 left-0 right-0 w-full max-w-[398px] mx-auto bg-white border-t border-blue-50 px-[20px]">
                <div className="pointer-events-auto bg-white mt-5">
                    <Button
                        className={"py-4 border border-[#162A43] shadow-[1px_1px_0_0_#162A43,3px_3px_0_0_#162A43] text-[20px] mb-2"}
                        variant="primary"
                        fullWidth
                        type="submit"
                        disabled={isPending}
                    >
                        {t("taskDetails.buttonGoToTasks")}
                    </Button>
                    <Button
                        className={"py-4 text-[20px] border-none mb-[20px] active:bg-transparent focus:bg-transparent"}
                        variant="text"
                        fullWidth
                        type="button"
                        onClick={onBack}
                    >
                        {t("taskDetails.labelAnythingElse")}
                    </Button>
                </div>
            </div>
        </form>
    );
};
