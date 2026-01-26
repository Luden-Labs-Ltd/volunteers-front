import { Button } from "@/shared/ui";

interface ConfirmationViewProps {
    volunteerName: string;
    requesterName: string;
    requesterPhone: string;
    requesterAvatar: string;
    fallbackAvatar: string;
    onConfirm: () => void;
    onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ConfirmationView = ({
volunteerName,
requesterName,
requesterPhone,
requesterAvatar,
fallbackAvatar,
onConfirm,
onCancel,
}: ConfirmationViewProps) => {
    return (
        <>
            <p className="mt-2 text-[16px] leading-snug text-[#393939] font-normal text-center">
                In order for {volunteerName} to come, the system will now share your contact details with him:
            </p>

            <div className="mt-4 space-y-3 rounded-xl border shadow-[3px_3px_0_0_#F2F2F2] px-2 border-[#F2F2F2]">
                <div className="w-full px-4 py-3 flex items-center gap-3">
                    <img
                        src={requesterAvatar || fallbackAvatar}
                        alt={requesterName}
                        className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-[16px] text-[#393939]">{requesterName}</span>
                </div>

                <div className="w-full px-4 py-3 flex items-center gap-3 border-t-[1px] border-[#F2F2F2]">
                    <span className="text-[18px]">📞</span>
                    <span className="text-[16px] text-[#393939]">{requesterPhone}</span>
                </div>
            </div>

            <div className="mt-5">
                <Button
                    onClick={onConfirm}
                    className="w-full h-[56px] rounded-xl border border-[#162A43] bg-[#004573] text-white shadow-[3px_3px_0_0_#162A43] text-[20px] font-medium"
                >
                    Confirm and Share Details
                </Button>
            </div>

            <button
                onClick={onCancel}
                className="w-full mt-3 h-[44px] text-[20px] font-medium text-[#004573]"
            >
                Cancel
            </button>
        </>
    );
};
