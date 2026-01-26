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
    const navigate = useNavigate();
    const { data: user, isLoading } = useUserById(response.volunteerId);
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
                    onClick={() => navigate(`/needy/tasks/${response.taskId}/volunteer/${user.id}/approve`)}
                />
            </div>
        </>
    );
};
