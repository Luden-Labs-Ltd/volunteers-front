import { Icon } from "@/shared/ui";

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
    return (
        <div className="w-full bg-white rounded-3xl p-6 border shadow-[1px_1px_0_0_#F2F2F2,2px_2px_0_0_#F2F2F2] relative mt-3">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-medium text-[#393939]">
                    Reviews:
                </h3>
                <button onClick={onViewAll} className="text-[14px] font-normal text-[#004573]">
                    View all
                </button>
            </div>
            <div className="flex flex-col gap-6">
                {reviews.map((review) => (
                    <div key={review.id} className="relative flex flex-col gap-2">
                        <div className="flex gap-1 relative bottom-10 left-20">
                            {Array.from({ length: review.rating }).map((_, index) => (
                                <Icon
                                    key={index}
                                    size={16}
                                    iconId="icon-star"
                                    className="mt-0.5"
                                />
                            ))}
                        </div>
                        <p className="text-[16px] leading-6 text-[#737373] font-normal -mt-10">
                            "{review.text}"
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
