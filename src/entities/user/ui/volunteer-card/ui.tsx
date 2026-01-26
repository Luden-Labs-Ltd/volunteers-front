import { cn } from "@/shared/lib";
import { Icon } from "@/shared/ui";
import { UserWithProfile } from "@/entities/user";

type VolunteerCardType = {
    volunteer: UserWithProfile;
    className?: string;
    onClick?: () => void;
}

export const VolunteerCard = ({ volunteer, className, onClick }: VolunteerCardType) => {
    const fullName = [volunteer.firstName, volunteer.lastName].filter(Boolean).join(" ");
    const displayName = fullName || "Unknown Volunteer";
    const isVerified = volunteer.status === "approved";
    const photoUrl = (volunteer.photo || "").replace(/^"|"$/g, '');
    const skills = volunteer.role === 'volunteer' && volunteer.profile && 'skills' in volunteer.profile
        ? (volunteer.profile.skills || [])
        : [];
    const location = volunteer.role === 'volunteer' && volunteer.profile && 'city' in volunteer.profile && volunteer.profile.city
        ? volunteer.profile.city.name
        : '';

    return (
        <div
            onClick={onClick}
            className={cn(
                "w-full h-[95px] bg-white rounded-2xl p-4 border border-[#F2F2F2] flex items-center gap-4 transition-all cursor-pointer",
                "shadow-[1px_1px_0_0_#F2F2F2,3px_3px_0_0_#F2F2F2]",
                className
            )}
        >
            <div className="flex-shrink-0 relative">
                <img
                    src={photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${volunteer.id}`}
                    alt={displayName}
                    className="w-[56px] h-[56px] rounded-full object-cover border-[3px] border-white"
                />
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
                <div className="flex items-center gap-2">
                    <h3 className="text-[18px] font-medium text-[#5B5B5B] leading-none tracking-tight truncate">
                        {displayName}
                    </h3>
                    {isVerified && (
                        <Icon size={16} iconId={"icon-approve"} />
                    )}
                </div>

                <p className="text-[14px] text-[#5B5B5B] font-normal leading-tight">
                    {location}
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-0.5">
                    {skills.map((skill, index) => (
                        <div key={skill.id || index} className="flex items-center gap-1.5">
                            {skill.iconSvg ? (
                                <div
                                    className="w-5 h-5 flex-shrink-0 [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain"
                                    dangerouslySetInnerHTML={{ __html: skill.iconSvg }}
                                />
                            ) : (
                                <span className="text-base">🔧</span>
                            )}
                            <span className="text-[#8795B0] text-[14px] font-medium leading-none">
                {skill.name}
            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
