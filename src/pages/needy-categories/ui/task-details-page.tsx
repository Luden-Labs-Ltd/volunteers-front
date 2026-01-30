import { useNavigate } from "react-router-dom";
import { useCreateTaskStore } from "@/features/create-task/model/store";
import {CreateTaskForm} from "@/features/create-task-form/ui";

export const TaskDetailsPage = () => {
    const navigate = useNavigate();
    const { categoryId, skillIds, reset, aiGeneratedData } = useCreateTaskStore();
    // Если пользователь пришел через AI, возвращаем на categories, иначе на skills
    const handleBack = () => {
        if (aiGeneratedData) {
            navigate("/needy/categories");
        } else {
            navigate("/needy/skills");
        }
    };
    
    const handleSuccess = () => {
        reset();
        navigate("/needy/tasks");
    };

    return (
        <CreateTaskForm
            skillsIds={skillIds}
            categoryId={categoryId}
            onBack={handleBack}
            onSuccess={handleSuccess}
        />
    )
}
