import { Icon } from "@/shared/ui";
import {useTranslation} from "react-i18next";

type Review = {
    id: number;
    authorName: string;
    rating: number;
    text: string;
}

type VolunteerReviewsCardType = {
    reviews: Review[];
    onViewAll?: () => void;
}

export const VolunteerReviewsCard = ({ reviews, onViewAll }: VolunteerReviewsCardType) => {
    const { t } = useTranslation();

    return (
        <div className="w-full bg-white rounded-3xl p-6 border shadow-[1px_1px_0_0_#F2F2F2,2px_2px_0_0_#F2F2F2] relative mt-3">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-medium text-[#393939]">
                    {t("reviewsCard.review")}
                </h3>
                <button onClick={onViewAll} className="text-[14px] font-normal text-[#004573]">
                    {t("reviewsCard.viewAll")}
                </button>
            </div>
            <div className="flex flex-col gap-6">
                {reviews.map((review) => (
                    <div key={review.id} className="relative flex flex-col pt-6">
                        <div className="absolute -top-[38px] right-[120px] flex gap-1 rtl:right-auto rtl:left-[135px]">
                            {Array.from({ length: review.rating }).map((_, index) => (
                                <Icon key={index} size={16} iconId="icon-star" />
                            ))}
                        </div>
                        <p className="text-[16px] leading-6 text-[#737373] font-normal">
                            "{review.text}"
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
