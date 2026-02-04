import {Icon} from "@/shared/ui";
import {Review} from "@/entities/user";

export const ReviewItem = ({ review }: { review: Review }) => {
    return (
        <div className="relative flex flex-col pt-1">
            <div className="absolute -top-[38px] right-[120px] se-only:right-[110px] flex gap-1 rtl:right-auto rtl:left-[135px]">
                {Array.from({ length: review.rating }).map((_, index) => (
                    <Icon key={index} size={16} iconId="icon-star" />
                ))}
            </div>
            <p className="text-[16px] leading-6 text-[#737373] font-normal">
                "{review.text}"
            </p>
        </div>
    );
};