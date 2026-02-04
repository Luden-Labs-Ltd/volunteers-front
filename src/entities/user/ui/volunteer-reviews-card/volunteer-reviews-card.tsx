import { useTranslation } from "react-i18next";
import {ReviewItem} from "@/entities/user/ui/volunteer-reviews-card/review-item.tsx";
import {Review} from "@/entities/user";


type VolunteerReviewsCardType = {
    reviews: Review[];
    onViewAll?: () => void;
};

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
                    <ReviewItem key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
};
