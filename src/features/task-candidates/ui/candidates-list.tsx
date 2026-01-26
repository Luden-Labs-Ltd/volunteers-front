import {useUserById} from "@/entities/user/model/hooks/use-get-user-by-id.ts";
import {VolunteerCard} from "@/entities/user/ui/volunteer-card";
import {VolunteerCardSkeleton} from "@/shared/ui/skeleton/VolunteerCardSkeleton";
import {TaskResponse} from "@/entities/task/model/types";
import {useNavigate} from "react-router-dom";

interface CandidatesListProps {
    taskId: string;
    response: TaskResponse;
}

export const CandidatesList = ({ response }: CandidatesListProps) => {
    // const { t } = useTranslation();
    const navigate = useNavigate();
    const { data: user, isLoading } = useUserById(response.volunteerId);
    // const approveMutation = useApproveVolunteer();
    // const rejectMutation = useRejectVolunteer();
    // const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    // const isApproved = response.status === 'approved';
    // const isRejected = response.status === 'rejected';
    // const isPending = response.status === 'pending';

    // const handleApprove = () => {
    //     approveMutation.mutate(
    //         {
    //             taskId,
    //             volunteerId: response.volunteerId,
    //         },
    //         {
    //             onSuccess: () => {
    //                 // После успешного одобрения возвращаемся на страницу задачи
    //                 setTimeout(() => {
    //                     navigate(`/needy/tasks/${taskId}`, { replace: true });
    //                 }, 1500); // Задержка для показа toast уведомления
    //             },
    //         }
    //     );
    // };
    //
    // const handleReject = () => {
    //     rejectMutation.mutate({
    //         taskId,
    //         volunteerId: response.volunteerId,
    //     });
    // };

    if (isLoading) return (
        <div className="flex flex-col mb-4">
            <VolunteerCardSkeleton />
        </div>
    );
    if (!user) return null;

    return (
        <>
            <div className="flex flex-col mb-4 gap-3">
                <VolunteerCard
                    volunteer={user}
                    onClick={() => navigate(`/needy/tasks/volunteer/${user?.id}/approve`)}
                />

                {/*{isPending && (*/}
                {/*    <div className="flex gap-2 px-2">*/}
                {/*        <Button*/}
                {/*            variant="primary"*/}
                {/*            size="md"*/}
                {/*            fullWidth*/}
                {/*            onClick={handleApprove}*/}
                {/*            disabled={approveMutation.isPending || rejectMutation.isPending}*/}
                {/*        >*/}
                {/*            {approveMutation.isPending*/}
                {/*                ? (t('taskResponses.approving') || 'Одобрение...')*/}
                {/*                : (t('taskResponses.approve') || 'Одобрить')*/}
                {/*            }*/}
                {/*        </Button>*/}
                {/*        <Button*/}
                {/*            variant="outline"*/}
                {/*            size="md"*/}
                {/*            fullWidth*/}
                {/*            onClick={handleReject}*/}
                {/*            disabled={approveMutation.isPending || rejectMutation.isPending}*/}
                {/*        >*/}
                {/*            {rejectMutation.isPending*/}
                {/*                ? (t('taskResponses.rejecting') || 'Отклонение...')*/}
                {/*                : (t('taskResponses.reject') || 'Отклонить')*/}
                {/*            }*/}
                {/*        </Button>*/}
                {/*    </div>*/}
                {/*)}*/}

                {/*{isApproved && (*/}
                {/*    <div className="px-2">*/}
                {/*        <div className="text-sm text-green-600 font-medium">*/}
                {/*            {t('taskResponses.approved') || '✓ Одобрен'}*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}

                {/*{isRejected && (*/}
                {/*    <div className="px-2">*/}
                {/*        <div className="text-sm text-red-600 font-medium">*/}
                {/*            {t('taskResponses.rejected') || '✗ Отклонен'}*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
            {/*<VolunteerDetailsModal*/}
            {/*    isOpen={isDetailsModalOpen}*/}
            {/*    onClose={() => setIsDetailsModalOpen(false)}*/}
            {/*    volunteer={user}*/}
            {/*/>*/}
        </>
    );
};
