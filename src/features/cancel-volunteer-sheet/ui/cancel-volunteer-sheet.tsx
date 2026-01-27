
import { Button } from "@/shared/ui";
import { User } from "@/entities/user/model/types";
import { useModalControl } from "@/features/approve-candidate-sheet/modal";

type CancelVolunteerSheetType = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    volunteer: User | null;
    isProcessing: boolean;
}

export const CancelVolunteerSheet = ({
isOpen,
onClose,
onConfirm,
volunteer,
isProcessing
}: CancelVolunteerSheetType) => {
    useModalControl(isOpen, onClose);
    if (!volunteer) return null;
    const handleCloseAction = () => {
        if (!isProcessing) onClose();
    };

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
                <p className="mt-4 text-[16px] leading-snug text-[#393939] font-normal text-center">
                    Are you sure you want to cancel this volunteer? <br/>
                    The task will become active again for others to apply.
                </p>
                <div className="mt-6 space-y-3">
                    <Button
                        onClick={onConfirm}
                        disabled={isProcessing}
                        className="w-full h-[56px] rounded-xl border border-[#004573] bg-[#004573] text-white text-[20px] font-medium shadow-[1px_1px_0_0_#002640,3px_3px_0_0_#002640]"
                    >
                        Yes, cancel volunteer
                    </Button>
                    <Button
                        onClick={handleCloseAction}
                        disabled={isProcessing}
                        className="w-full h-[56px] bg-transparent border border-[#004573] text-[#004573] text-[20px] font-medium hover:bg-transparent shadow-[1px_1px_0_0_#002640,3px_3px_0_0_#002640]"
                    >
                        Keep volunteer
                    </Button>
                </div>
            </div>
        </div>
    );
};
