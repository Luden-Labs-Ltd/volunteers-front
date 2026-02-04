import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserById } from "@/entities/user/model/hooks/use-get-user-by-id.ts";
import { Button, Icon } from "@/shared/ui";
import { UserProfileHeader } from "@/entities/user/ui/user-profile-header";
import { VolunteerAreasCard } from "@/entities/user/ui/volunteer-areas-card";
import { VolunteerReviewsCard } from "@/entities/user/ui/volunteer-reviews-card";
import {ApproveCandidateSheet} from "@/features/approve-candidate-sheet/ui";
import {UserWithVolunteerData} from "@/entities/user";

export const CandidateApprovePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { taskId, volunteerId } = useParams<{ taskId: string; volunteerId: string }>();
    const { data: user } = useUserById(volunteerId || "");
    const volunteer = user as UserWithVolunteerData;

    const [isSheetOpen, setIsSheetOpen] = useState(false);
    if (!volunteer) return <div>{t('taskResponses.userNotFound')}</div>;
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
        <div className="w-full max-w-[393px] min-h-screen mx-auto relative bg-white">
            <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[50] w-full bg-gradient-to-b from-blue-50 to-white pt-[calc(30px+env(safe-area-inset-top))] pb-4 px-[20px]">
                <div className="relative w-full flex items-center justify-center">
                    <div className="absolute start-0 top-0">
                        <Button
                            icon={<Icon iconId="icon-arrow-back" className="rtl:rotate-180"/>}
                            variant="transition"
                            size="sm"
                            onClick={() => navigate(`/needy/tasks`)}
                        />
                    </div>
                    <h1 className="text-[24px] text-[#004573] font-bold leading-[1.2] text-center tracking-tight whitespace-pre-line">
                        {t('taskResponses.volunteerForYourTask')}
                    </h1>
                </div>
            </div>

            <div className="pt-[calc(170px+env(safe-area-inset-top))] pb-[calc(140px+env(safe-area-inset-top))] px-[20px]">
                <UserProfileHeader user={volunteer} />

                <div className="flex justify-between items-center p-3 rounded-xl border shadow-[1px_1px_0_0_#F2F2F2,2px_2px_0_0_#F2F2F2] mb-3 mt-3 bg-white">
                    <span className="text-[18px] font-medium text-[#393939]">{t('taskResponses.completedTasks')}</span>
                    <span className="text-[16px] font-normal text-[#737373]">{volunteer.profile.completedTasksCount} {t('taskResponses.tasks')}</span>
                </div>

                <VolunteerAreasCard areas={realSkills} />
                <VolunteerReviewsCard reviews={reviews} />
            </div>
            <div className="fixed bottom-[50px] left-1/2 -translate-x-1/2 z-[50] w-full">
                <div className="w-full bg-white px-5 py-4 z-[0]">
                    <Button
                        onClick={handleOpenSheet}
                        className="w-full h-[48px] rounded-xl border border-[#162A43] bg-[#004573] text-white shadow-[3px_3px_0_0_#162A43] text-[20px] font-medium focus:ring-0 focus:ring-offset-0 focus:outline-none"
                    >
                        {t('taskResponses.approveAndSyncArrival')}
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
