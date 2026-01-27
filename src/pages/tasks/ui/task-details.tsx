import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Lottie from "lottie-react";
import { Button, Icon } from '@/shared/ui';
import { useCancelAssignment, useCompleteTask, useGetTaskById } from "@/entities/task/hook";
import { UserProfileHeader } from "@/entities/user/ui/user-profile-header";
import { useGetMe } from "@/entities/user";
import successAnimation from '@/shared/assets/animations/confetti.json';
import { ContactActions } from "@/entities/user/ui/contact-actions";
import { useRejectVolunteer } from "@/entities/taskResponses/hook";
import {CancelVolunteerSheet} from "@/features/cancel-volunteer-sheet/ui";

export const TaskDetailsPage = () => {
    const navigate = useNavigate();
    const { taskId } = useParams<{ taskId: string }>();
    const [showAnimation, setShowAnimation] = useState<boolean>(false);
    const [isCancelSheetOpen, setIsCancelSheetOpen] = useState(false);
    const { data: task } = useGetTaskById(taskId);
    const { data: user } = useGetMe();
    const { mutate: completeTask, isPending: isCompleting } = useCompleteTask();
    const { mutate: cancelAssignment, isPending: isCanceling } = useCancelAssignment();
    const { mutate: rejectVolunteer, isPending: isRejecting } = useRejectVolunteer();
    const isProcessing = isCompleting || isCanceling || isRejecting;
    const volunteer = task?.assignedVolunteer;
    const cleanPhone = volunteer?.phone ? volunteer.phone.replace(/[^0-9+]/g, '') : '';

    const handleComplete = () => {
        if (!taskId) return;
        completeTask(taskId, {
            onSuccess: () => {
                setShowAnimation(true);
            },
        });
    };

    const handleOpenCancelSheet = () => {
        setIsCancelSheetOpen(true);
    };
    const handleConfirmCancel = () => {
        if (!taskId || !volunteer?.id) return;

        cancelAssignment(taskId, {
            onSuccess: () => {
                rejectVolunteer({
                    taskId,
                    volunteerId: volunteer.id
                }, {
                    onSuccess: () => {
                        setIsCancelSheetOpen(false);
                        navigate(-1);
                    }
                });
            }
        });
    };

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
                <div className="flex flex-col p-1 rounded-2xl border border-[#F2F2F2] shadow-[1px_1px_0_0_#F2F2F2,3px_3px_0_0_#F2F2F2] mb-4">
                    <div className={"flex justify-between py-3 px-5"}>
                        <span className={"text-[18px] font-medium text-[#4F4F4F]"}>Volunteer details</span>
                        <Link to={`/volunteers/${volunteer?.id}`} className="text-[16px] font-normal text-[#004573]">
                            View profile
                        </Link>
                    </div>
                    <div>
                        <div className={"flex gap-3 py-3 px-5 border-t border-[#F2F2F2]"}>
                            <Icon iconId={"icon-phone"} />
                            <a href={`tel:${cleanPhone}`}>
                                {volunteer?.phone}
                            </a>
                        </div>
                        <div className={"flex gap-3 py-3 px-5 border-t border-[#F2F2F2]"}>
                            <Icon iconId={"icon-location"} />
                            <span>{"Kisufim"}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col p-1 rounded-2xl border border-[#F2F2F2] shadow-[1px_1px_0_0_#F2F2F2,3px_3px_0_0_#F2F2F2]">
                    <div className={"flex py-3 px-5"}>
                        <span className={"text-[18px] font-medium text-[#4F4F4F]"}>Task details</span>
                    </div>
                    <div>
                        <div className={"flex justify-between py-3 px-5 border-t border-[#F2F2F2]"}>
                            <div className="flex items-center gap-3">
                                {task?.category?.iconSvg && (
                                    <span
                                        className="w-6 h-6 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                                        dangerouslySetInnerHTML={{ __html: task.category.iconSvg }}
                                    />
                                )}
                                <span className={"text-[16px] font-normal text-[#393939]"}>{task?.title}</span>
                            </div>
                            {task?.firstResponseMode && (
                                <span className={"bg-[#FFFCF2] p-1 rounded-lg text-[16px] font-normal"}>Urgent</span>
                            )}
                        </div>
                        <div className={"flex gap-3 py-3 px-5 border-t border-[#F2F2F2]"}>
                            <span className={"text-[16px] font-normal"}>
                                Details: {task?.description}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {showAnimation && (
                <div className="fixed inset-0 z-[100] flex items-end justify-center pointer-events-none pb-16">
                    <div className="w-full">
                        <Lottie
                            animationData={successAnimation}
                            loop={false}
                            className="w-full h-full"
                            onComplete={() => {
                                if (user?.role === 'needy') {
                                    navigate(`/needy/taskCompletionFeedbackPage`);
                                }
                            }}
                        />
                    </div>
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
                        onClick={handleOpenCancelSheet}
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
