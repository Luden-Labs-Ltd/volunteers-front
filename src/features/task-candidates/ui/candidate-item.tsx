import { useNavigate } from "react-router-dom";
import { VolunteerCard } from "@/entities/user/ui/volunteer-card";
import { VolunteerCardSkeleton } from "@/shared/ui/skeleton/VolunteerCardSkeleton";
import { TaskResponse } from "@/entities/task/model/types";
import {useUserById} from "@/entities/user/model/hooks/use-get-user-by-id.ts";

type CandidateItemType = {
    response: TaskResponse;
}

export const CandidateItem = ({ response }: CandidateItemType) => {
    const navigate = useNavigate();
    const { data: user, isLoading } = useUserById(response.volunteerId);

    if (isLoading) return <VolunteerCardSkeleton />;
    if (!user) return null;

    return (
        <VolunteerCard
            volunteer={user}
            onClick={() => navigate(`/needy/tasks/${response.taskId}/volunteer/${user.id}/approve`)}
        />
    );
};
