import { useState } from "react";
import { cn } from "@/shared/lib";
import { Icon } from "@/shared/ui";
import { UserWithProfile } from "@/entities/user";
import {useTranslation} from "react-i18next";

type VolunteerCardType = {
    volunteer: UserWithProfile;
    className?: string;
    onClick?: () => void;
}

export const VolunteerCard = ({ volunteer, className, onClick }: VolunteerCardType) => {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    const fullName = [volunteer.firstName, volunteer.lastName].filter(Boolean).join(" ");
    const displayName = fullName || "Unknown Volunteer";
    const isVerified = volunteer.status === "approved";
    const photoUrl = (volunteer.photo || "").replace(/^"|"$/g, '');

    const isVolunteer = volunteer.role === 'volunteer';
    
    const skills = isVolunteer && volunteer.profile?.skills || [];
    const location = isVolunteer && volunteer.profile?.city?.name || '';

    const VISIBLE_COUNT = 2;
    const hasMore = skills.length > VISIBLE_COUNT;
    const hiddenCount = skills.length - VISIBLE_COUNT;

    const displayedSkills = isExpanded ? skills : skills.slice(0, VISIBLE_COUNT);

    const handleExpandClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    return (
        <div
            onClick={onClick}
            className={cn(
                "w-full bg-white rounded-[20px] p-5 flex items-start gap-4 transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-100",
                "shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]",
                className
            )}
        >
            <div className="flex-shrink-0 relative mt-1">
                <img
                    src={photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${volunteer.id}`}
                    alt={displayName}
                    className="w-[56px] h-[56px] rounded-full object-cover shadow-sm"
                />
            </div>

            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                <div>
                    <div className="flex items-center gap-1.5">
                        <h3 className="text-[18px] font-medium text-[#5B5B5B]">
                            {displayName}
                        </h3>
                        {isVerified && (
                            <Icon size={18} iconId={"icon-approve"} className="text-green-500 shrink-0" />
                        )}
                    </div>
                    <p className="text-[14px] text-[#8795B0] font-normal leading-tight mt-0.5">
                        {location}
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-y-2">
                    {displayedSkills.map((skill, index) => (
                        <div key={skill.id || index} className="flex items-center gap-1 min-w-0 ">
                            {skill.iconSvg ? (
                                <div
                                    className="w-[18px] h-[18px] flex-shrink-0 [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain"
                                    dangerouslySetInnerHTML={{ __html: skill.iconSvg }}
                                />
                            ) : (
                                <span className="text-lg">🔧</span>
                            )}
                            <span className="text-[12px] font-medium text-[#8795B0] leading-none truncate">
                                {skill.name}
                            </span>
                        </div>
                    ))}
                </div>
                {hasMore && (
                    <button
                        onClick={handleExpandClick}
                        className="text-sm font-normal text-[#004573] self-start mt-1"
                    >
                        {isExpanded
                            ? t("common.hideSkills")
                            : `+${hiddenCount} ${t("common.moreSkills")}`
                        }
                    </button>
                )}
            </div>
        </div>
    );
};
