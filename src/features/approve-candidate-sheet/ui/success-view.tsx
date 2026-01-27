import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui";

interface SuccessViewProps {
    onBack: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SuccessView = ({ onBack }: SuccessViewProps) => {
    const { t } = useTranslation();
    return (
        <>
            <div className="mt-6 mb-8 text-center px-4">
                <h3 className="text-[24px] font-medium text-[#393939] whitespace-pre-line">
                    {t('taskResponses.volunteerApprovedTitle')}
                </h3>
            </div>
            <div className="mt-5 mb-3">
                <Button
                    onClick={onBack}
                    className="w-full h-[56px] rounded-xl border border-[#162A43] bg-[#004573] text-white shadow-[3px_3px_0_0_#162A43] text-[20px] font-medium"
                >
                    {t('taskResponses.backToMyTasks')}
                </Button>
            </div>
        </>
    );
};
