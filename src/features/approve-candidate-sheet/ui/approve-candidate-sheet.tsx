import {ApproveCandidateSheetProps, useModalControl} from "@/features/approve-candidate-sheet/modal";
import {useGetMe} from "@/entities/user";
import {useNavigate} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import { SuccessView } from "./success-view";
import { UserProfileHeader } from "@/entities/user/ui/user-profile-header";
import { ConfirmationView } from "./confirmation-view";
import {useAssignVolunteer} from "@/entities/task/hook";


export const ApproveCandidateSheet = ({
isOpen,
onClose,
volunteer,
taskId
}: ApproveCandidateSheetProps) => {
    const { data: me } = useGetMe();
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);
    const { mutate: assignVolunteer } = useAssignVolunteer();
    useModalControl(isOpen, onClose);
    useEffect(() => {
        if (isOpen) setIsSuccess(false);
    }, [isOpen]);

    const handleConfirmClick = () => {
        if (!taskId || !volunteer.id) return;
        assignVolunteer(
            { taskId, volunteerId: volunteer.id },
            {
                onSuccess: () => {
                    setIsSuccess(true);
                }
            }
        );
    };

    const handleCloseAction = (e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget.blur();
        onClose();
    };

    const handleBackToTasks = (e: React.MouseEvent<HTMLButtonElement>) => {
        handleCloseAction(e);
        navigate("/needy/tasks");
    };
    const volunteerName = useMemo(
        () => [volunteer.firstName, volunteer.lastName].filter(Boolean).join(" ") || "Volunteer",
        [volunteer]
    );

    const requesterData = useMemo(() => {
        const rawPhoto = (me?.photo ?? "").toString().replace(/^"|"$/g, "").trim();
        const fallback = `https://api.dicebear.com/7.x/avataaars/svg?seed=${me?.id}`;
        return {
            name: [me?.firstName, me?.lastName].filter(Boolean).join(" ") || "Me",
            phone: me?.phone || "",
            avatar: rawPhoto || fallback,
            fallbackAvatar: fallback,
        };
    }, [me]);

    return (
        <div
            className={[
                "fixed inset-0 z-[10000] left-1/2 -translate-x-1/2 w-full",
                isOpen ? "pointer-events-auto" : "pointer-events-none",
            ].join(" ")}
            aria-hidden={!isOpen}
        >
            <div
                onClick={handleCloseAction}
                className={[
                    "absolute inset-0 transition-opacity duration-300",
                    isOpen ? "opacity-40 bg-black" : "opacity-0 bg-black",
                ].join(" ")}
            />

            <div
                role="dialog"
                aria-modal="true"
                className={[
                    "absolute left-0 right-0 bottom-0",
                    "bg-white rounded-t-[28px]",
                    "px-5 pt-3 pb-[calc(16px+env(safe-area-inset-bottom))]",
                    "transition-transform duration-300 ease-out",
                    isOpen ? "translate-y-0" : "translate-y-full",
                ].join(" ")}
            >
                <div className="mx-auto w-12 h-1.5 rounded-full bg-[#D9D9D9]" />
                <div className="mt-4">
                    <UserProfileHeader user={volunteer} />
                </div>
                {isSuccess ? (
                    <SuccessView onBack={handleBackToTasks} />
                ) : (
                    <ConfirmationView
                        volunteerName={volunteerName}
                        requesterName={requesterData.name}
                        requesterPhone={requesterData.phone}
                        requesterAvatar={requesterData.avatar}
                        fallbackAvatar={requesterData.fallbackAvatar}
                        onConfirm={handleConfirmClick}
                        onCancel={handleCloseAction}
                    />
                )}
            </div>
        </div>
    );
};
