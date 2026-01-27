import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTaskById, useCompleteTask, useCancelAssignment } from "@/entities/task/hook";
import { useRejectVolunteer } from "@/entities/taskResponses/hook";
import { useGetMe } from "@/entities/user";

export const useTaskDetailsPage = () => {
    const navigate = useNavigate();
    const { taskId } = useParams<{ taskId: string }>();
    const [showAnimation, setShowAnimation] = useState(false);
    const [isCancelSheetOpen, setIsCancelSheetOpen] = useState(false);

    const { data: task } = useGetTaskById(taskId);
    const { data: user } = useGetMe();

    const { mutate: completeTask, isPending: isCompleting } = useCompleteTask();
    const { mutate: cancelAssignment, isPending: isCanceling } = useCancelAssignment();
    const { mutate: rejectVolunteer, isPending: isRejecting } = useRejectVolunteer();

    const isProcessing = isCompleting || isCanceling || isRejecting;
    const volunteer = task?.assignedVolunteer;

    const handleComplete = () => {
        if (!taskId) return;
        completeTask(taskId, {
            onSuccess: () => setShowAnimation(true),
        });
    };

    const handleConfirmCancel = () => {
        if (!taskId || !volunteer?.id) return;
        cancelAssignment(taskId, {
            onSuccess: () => {
                rejectVolunteer({ taskId, volunteerId: volunteer.id }, {
                    onSuccess: () => {
                        setIsCancelSheetOpen(false);
                        navigate(-1);
                    }
                });
            }
        });
    };

    const handleAnimationComplete = () => {
        if (user?.role === 'needy') {
            navigate(`/needy/taskCompletionFeedbackPage`);
        }
    };

    return {
        task,
        volunteer,
        showAnimation,
        isCancelSheetOpen,
        isProcessing,
        setIsCancelSheetOpen,
        handleComplete,
        handleConfirmCancel,
        handleAnimationComplete,
        navigate
    };
};
