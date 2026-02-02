import { Button } from "@/shared/ui";
import { User } from "@/entities/user/model/types";
import { useModalControl } from "@/features/approve-candidate-sheet/modal";
import { useTranslation } from "react-i18next";
import { useBodyScrollLock } from "@/shared/hook/use-body-scroll-lock";

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
    useBodyScrollLock(isOpen);
    const { t } = useTranslation();
    if (!volunteer) return null;
    const handleOverlayClick = (e: React.MouseEvent<HTMLElement>) => {
        if (!isProcessing && e.target === e.currentTarget) {
            onClose();
        }
    };
    const handleKeepVolunteer = () => {
        if (!isProcessing) {
            onClose();
        }
    };
    return (
        <div
            className={[
                "fixed inset-0 z-[10000] w-full h-full flex items-end justify-center",
                isOpen ? "pointer-events-auto" : "pointer-events-none",
            ].join(" ")}
            aria-hidden={!isOpen}
        >
            <div
                onClick={handleOverlayClick}
                className={[
                    "absolute inset-0 transition-opacity duration-300 touch-none",
                    isOpen ? "opacity-60 bg-black" : "opacity-0 bg-black",
                ].join(" ")}
            />
            <div
                role="dialog"
                aria-modal="true"
                className={[
                    "relative w-full max-w-[420px]",
                    "bg-white rounded-t-[28px]",
                    "px-5 pt-3 pb-1",
                    "transition-transform duration-300 ease-out z-10",
                    isOpen ? "translate-y-0" : "translate-y-full",
                ].join(" ")}
            >
                <div className="mx-auto w-12 h-1.5 rounded-full bg-[#D9D9D9]" />
                <p className="mt-6 text-[16px] leading-snug text-[#393939] font-normal text-center px-2">
                    {t("sheet.sure")}
                </p>
                <div className="mt-8 space-y-3 w-full">
                    <Button
                        onClick={onConfirm}
                        disabled={isProcessing}
                        className="w-full h-[56px] rounded-xl border border-[#004573] bg-[#004573] text-white text-[20px] font-medium shadow-[1px_1px_0_0_#002640,3px_3px_0_0_#002640]"
                    >
                        {t("sheet.yesCancel")}
                    </Button>
                    <Button
                        onClick={handleKeepVolunteer}
                        disabled={isProcessing}
                        className="w-full h-[56px] bg-transparent border border-[#004573] text-[#004573] text-[20px] font-medium hover:bg-transparent shadow-[1px_1px_0_0_#002640,3px_3px_0_0_#002640]"
                    >
                        {t("sheet.keep")}
                    </Button>
                </div>
            </div>
        </div>
    );
};
