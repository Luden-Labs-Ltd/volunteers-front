import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserById } from "@/entities/user/model/hooks/use-get-user-by-id.ts";
import { Button, Icon } from "@/shared/ui";
import { UserProfileHeader } from "@/entities/user/ui/user-profile-header";
import { VolunteerAreasCard } from "@/entities/user/ui/volunteer-areas-card";
import { VolunteerReviewsCard } from "@/entities/user/ui/volunteer-reviews-card";
import {ApproveCandidateSheet} from "@/features/approve-candidate-sheet/ui";
import {UserWithVolunteerData} from "@/entities/user";

export const CandidateApprovePage = () => {
    const navigate = useNavigate();
    const { taskId, volunteerId } = useParams<{ taskId: string; volunteerId: string }>();
    const { data: user } = useUserById(volunteerId || "");
    const volunteer = user as UserWithVolunteerData;

    const [isSheetOpen, setIsSheetOpen] = useState(false);
    if (!volunteer) return <div>User not found</div>;
    const realSkills =
        volunteer.role === "volunteer" && volunteer.profile && "skills" in volunteer.profile
            ? (volunteer.profile.skills || []).map((skill) => ({
                id: skill.id,
                name: skill.name,
                iconSvg: skill.iconSvg,
                tasksCount: 0,
            }))
            : [];

    const reviews = [
        {
            id: 1,
            authorName: "Sarah M.",
            rating: 5,
            text: "Yossi was an excellent plumber! He arrived quickly, solved the problem professionally.",
        },
    ];

    const handleOpenSheet = () => setIsSheetOpen(true);
    const handleCloseSheet = () => setIsSheetOpen(false);
    return (
        <div className="w-full max-w-[393px] min-h-screen mx-auto relative bg-white overflow-x-hidden">
            <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[50] w-full bg-gradient-to-b from-blue-50 to-white pt-16 pb-2 px-[20px]">
                <div className="relative w-full flex items-center justify-center min-h-[48px]">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2">
                        <Button
                            className={"mb-5"}
                            icon={<Icon iconId="icon-arrow-back" />}
                            variant="transition"
                            size="sm"
                            onClick={() => navigate(-1)}
                        />
                    </div>
                    <h1 className="text-[24px] text-[#004573] font-bold leading-[1.2] text-center tracking-tight">
                        Volunteer for <br />
                        your task
                    </h1>
                </div>
            </div>

            <div className="pt-[150px] pb-[150px] px-[20px]">
                <UserProfileHeader user={volunteer} />

                <div className="flex justify-between items-center p-3 rounded-xl border shadow-[1px_1px_0_0_#F2F2F2,2px_2px_0_0_#F2F2F2] mb-3 mt-3 bg-white">
                    <span className="text-[18px] font-medium text-[#393939]">Completed tasks</span>
                    <span className="text-[16px] font-normal text-[#737373]">{volunteer.profile.completedTasksCount} tasks</span>
                </div>

                <VolunteerAreasCard areas={realSkills} />
                <VolunteerReviewsCard reviews={reviews} />
            </div>

            <div className="fixed bottom-[69px] left-1/2 -translate-x-1/2 z-[50] w-full max-w-[393px]">
                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[50] w-full max-w-[393px] bg-transparent px-5 py-4">
                    <Button
                        onClick={handleOpenSheet}
                        className="w-full h-[56px] rounded-xl border border-[#162A43] bg-[#004573] text-white shadow-[3px_3px_0_0_#162A43] text-[20px] font-medium"
                    >
                        Approve and Sync Arrival
                    </Button>
                </div>
            </div>

            <ApproveCandidateSheet
                taskId={taskId || ""}
                isOpen={isSheetOpen}
                onClose={handleCloseSheet}
                volunteer={volunteer}
            />
        </div>
    );
};
