import { useUserById } from "@/entities/user/model/hooks/use-get-user-by-id.ts";
import { VolunteerCard } from "@/entities/user/ui/volunteer-card";
import { useApproveVolunteer, useRejectVolunteer } from "@/entities/taskResponses/hook";
import { Button } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { TaskResponse } from "@/features/respond-to-task/model";
import { useNavigate } from "react-router-dom";

interface CandidatesListProps {
    taskId: string;
    response: TaskResponse;
}

export const CandidatesList = ({ taskId, response }: CandidatesListProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data: user, isLoading } = useUserById(response.volunteerId);
    const approveMutation = useApproveVolunteer();
    const rejectMutation = useRejectVolunteer();

    const isApproved = response.status === 'approved';
    const isRejected = response.status === 'rejected';
    const isPending = response.status === 'pending';

    const handleApprove = () => {
        approveMutation.mutate(
            {
                taskId,
                volunteerId: response.volunteerId,
            },
            {
                onSuccess: () => {
                    // После успешного одобрения возвращаемся на список задач
                    setTimeout(() => {
                        navigate('/needy/tasks');
                    }, 1000); // Небольшая задержка для показа toast уведомления
                },
            }
        );
    };

    const handleReject = () => {
        rejectMutation.mutate({
            taskId,
            volunteerId: response.volunteerId,
        });
    };

    if (isLoading) return <div>Loading...</div>;
    if (!user) return null;

    // Получаем навыки из профиля волонтера
    const skills = user.role === 'volunteer' && user.profile && 'skills' in user.profile
        ? (user.profile.skills || []).map((skill: { name: string }) => skill.name)
        : [];

    // Получаем город из профиля волонтера
    const cityName = user.role === 'volunteer' && user.profile && 'city' in user.profile && user.profile.city
        ? user.profile.city.name
        : '';

    return (
        <div className="flex flex-col mb-4 gap-3">
            <VolunteerCard
                location={cityName}
                skills={skills}
                volunteer={{
                    ...user,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    photo: user.photo,
                }}
            />
            
            {isPending && (
                <div className="flex gap-2 px-2">
                    <Button
                        variant="primary"
                        size="md"
                        fullWidth
                        onClick={handleApprove}
                        disabled={approveMutation.isPending || rejectMutation.isPending}
                    >
                        {approveMutation.isPending 
                            ? (t('taskResponses.approving') || 'Одобрение...')
                            : (t('taskResponses.approve') || 'Одобрить')
                        }
                    </Button>
                    <Button
                        variant="outline"
                        size="md"
                        fullWidth
                        onClick={handleReject}
                        disabled={approveMutation.isPending || rejectMutation.isPending}
                    >
                        {rejectMutation.isPending
                            ? (t('taskResponses.rejecting') || 'Отклонение...')
                            : (t('taskResponses.reject') || 'Отклонить')
                        }
                    </Button>
                </div>
            )}
            
            {isApproved && (
                <div className="px-2">
                    <div className="text-sm text-green-600 font-medium">
                        {t('taskResponses.approved') || '✓ Одобрен'}
                    </div>
                </div>
            )}
            
            {isRejected && (
                <div className="px-2">
                    <div className="text-sm text-red-600 font-medium">
                        {t('taskResponses.rejected') || '✗ Отклонен'}
                    </div>
                </div>
            )}
        </div>
    );
};
