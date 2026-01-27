import Lottie from "lottie-react";
import {Button, Icon} from '@/shared/ui';
import {UserProfileHeader} from "@/entities/user/ui/user-profile-header";
import successAnimation from '@/shared/assets/animations/confetti.json';
import {ContactActions} from "@/entities/user/ui/contact-actions";
import {CancelVolunteerSheet} from "@/features/cancel-volunteer-sheet/ui";
import {useTaskDetailsPage} from "@/pages/tasks/modal";
import {VolunteerInfoCard} from "@/entities/user/ui/volunteer-info-card";
import {TaskInfoCard} from "@/entities/task/ui/task-info-card";

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

    return (
        <div className="w-full max-w-[393px] min-h-screen mx-auto relative bg-white overflow-x-hidden">
            <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[50] w-full bg-gradient-to-b from-blue-50 to-white pt-14 pb-2 px-[20px]">
                <div className="relative w-full flex items-center justify-center min-h-[48px]">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2">
                        <Button
                            icon={<Icon iconId="icon-arrow-back" />}
                            variant="transition"
                            size="sm"
                            onClick={() => navigate(-1)}
                        />
                    </div>
                    <h1 className="text-[32px] text-[#004573] font-medium leading-[1.2] text-center tracking-tight">
                        {task?.title}
                    </h1>
                </div>
            </div>

            <div className="pt-[120px] pb-[210px] px-[20px]">
                <div className={"flex justify-center mb-7"}>
                    <span className={"bg-[#D8FFD6] p-1 rounded-xl text-[16px] font-normal"}>Volunteer found</span>
                </div>
                {volunteer ? (
                    <UserProfileHeader user={volunteer} />
                ) : (
                    <div>Loading volunteer...</div>
                )}
                <ContactActions phone={volunteer?.phone}/>
                <TaskInfoCard volunteer={volunteer}/>
                <VolunteerInfoCard task={task} />
            </div>

            {showAnimation && (
                <div className="fixed inset-0 z-[100] flex items-end justify-center pointer-events-none pb-16">
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

            <div className="fixed bottom-[69px] left-1/2 -translate-x-1/2 z-[50] w-full max-w-[393px]">
                <div className="w-full bg-white px-5 py-4 border-t border-gray-100">
                    <Button
                        className="w-full h-[48px] rounded-xl border border-[#162A43] bg-[#004573] text-white shadow-[3px_3px_0_0_#162A43] text-[20px] font-medium"
                        onClick={handleComplete}
                        disabled={isProcessing}
                    >
                        Task completed!
                    </Button>
                    <Button
                        onClick={() => setIsCancelSheetOpen(true)}
                        disabled={isProcessing}
                        className="mt-2 w-full h-[48px] rounded-xl border border-[#162A43] bg-white text-[#004573] shadow-[3px_3px_0_0_#162A43] text-[20px] font-medium active:bg-transparent active::bg-transparent"
                    >
                        Cancel volunteer
                    </Button>
                </div>
            </div>
        </div>
    )
}
