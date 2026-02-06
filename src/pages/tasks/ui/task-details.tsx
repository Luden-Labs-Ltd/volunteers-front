import Lottie from "lottie-react";
import {Button, Icon} from '@/shared/ui';
import {UserProfileHeader} from "@/entities/user/ui/user-profile-header";
import successAnimation from '@/shared/assets/animations/confetti.json';
import {ContactActions} from "@/entities/user/ui/contact-actions";
import {CancelVolunteerSheet} from "@/features/cancel-volunteer-sheet/ui";
import {useTaskDetailsPage} from "@/pages/tasks/modal";
import {VolunteerInfoCard} from "@/entities/user/ui/volunteer-info-card";
import {TaskInfoCard} from "@/entities/task/ui/task-info-card";
import {useTranslation} from "react-i18next";
import {TaskApproveRole} from "@/entities/task";

export const TaskDetailsPage = () => {
    const {
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
    } = useTaskDetailsPage();
    const { t } = useTranslation();
    const isApprovedByNeedy = task?.approveBy?.includes(TaskApproveRole.NEEDY);
    return (
        <div className="relative">
            <div className="sticky top-0 z-[50] w-full pt-14 pb-2 px-5 transition-all bg-white">
                <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[50] w-full max-w-[430px] bg-gradient-to-b from-blue-50 to-white pt-[calc(30px+env(safe-area-inset-top))] pb-4 px-[20px]">
                    <div className="relative w-full flex justify-center items-start min-h-[40px]">

                        <div className="absolute left-0 top-0">
                            <Button
                                icon={<Icon iconId="icon-arrow-back" />}
                                variant="transition"
                                size="sm"
                                onClick={() => navigate(`/needy/tasks`)}
                            />
                        </div>
                        <div className="flex flex-col items-center max-w-[70%] text-center pt-1">
                            <h1 className="text-[24px] text-[#004573] font-medium leading-[1.1] break-words line-clamp-2">
                                {task?.title || "Task Details"}
                            </h1>
                            <div className="mt-2">
                <span className="bg-[#D8FFD6] text-[#00731D] px-2 py-0.5 rounded-lg text-[14px] font-normal">
                    {t('taskDetailsApprove.volunteerFound')}
                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="px-5 pt-16 pb-[calc(220px+env(safe-area-inset-bottom))] flex flex-col gap-6">
                {volunteer ? (
                    <UserProfileHeader user={volunteer} />
                ) : (
                    <div className="text-center text-gray-400">Loading volunteer...</div>
                )}
                <div className="flex justify-center w-full">
                    <ContactActions phone={volunteer?.phone}/>
                </div>
                <div className="flex flex-col gap-4">
                    <TaskInfoCard volunteer={volunteer}/>
                    <VolunteerInfoCard task={task} />
                </div>
            </div>

            {showAnimation && (
                <div className="fixed inset-0 z-[100] flex items-end justify-end pointer-events-none">
                    <Lottie
                        animationData={successAnimation}
                        loop={false}
                        className="w-full h-full"
                        onComplete={handleAnimationComplete}
                    />
                </div>
            )}

            <CancelVolunteerSheet
                isOpen={isCancelSheetOpen}
                onClose={() => setIsCancelSheetOpen(false)}
                onConfirm={handleConfirmCancel}
                volunteer={volunteer || null}
                isProcessing={isProcessing}
            />

            <div className="fixed bottom-[50px] left-1/2 -translate-x-1/2 z-[50] w-full">
                <div className="w-full bg-white px-5 py-4">
                    <Button
                        className="w-full h-[48px] rounded-xl border border-[#162A43] bg-[#004573] text-white shadow-[3px_3px_0_0_#162A43] text-[20px] font-medium active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                        onClick={handleComplete}
                        disabled={isProcessing || isApprovedByNeedy}
                    >
                        {!isApprovedByNeedy ? t('taskDetailsApprove.taskCompleted') : t('taskDetailsApprove.completionConfirmed')}
                    </Button>
                    <Button
                        onClick={() => setIsCancelSheetOpen(true)}
                        disabled={isProcessing}
                        className="mt-3 w-full h-[48px] rounded-xl border border-[#162A43] bg-white text-[#004573] shadow-[3px_3px_0_0_#162A43] text-[20px] font-medium active:bg-transparent"
                    >
                        {t('taskDetailsApprove.cancelVolunteer')}
                    </Button>
                </div>
            </div>
        </div>
    )
}
