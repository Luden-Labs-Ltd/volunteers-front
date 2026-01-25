import { cn } from "@/shared/lib";
import { User } from "@/entities/user";
import { Icon } from "@/shared/ui";

type VolunteerCardType = {
    volunteer: User;
    className?: string;
    onClick?: () => void;
    location: string;
    skills: string[];
}

export const VolunteerCard = ({ volunteer, className, onClick, location, skills }: VolunteerCardType) => {
    const fullName = [volunteer.firstName, volunteer.lastName].filter(Boolean).join(" ");
    const displayName = fullName || "Unknown Volunteer";
    const isVerified = volunteer.status === "approved";
    const photoUrl = (volunteer.photo || "").replace(/^"|"$/g, '')

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
                    src={photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=123`}
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
                <div className="flex flex-wrap items-center gap-2 mt-0.5">
                    {skills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-1">
                            {/*Добавить реальную иконку*/}
                            <span className="text-xs">🍲</span>
                            <span className="text-[#8795B0] text-[14px] font-medium leading-none">{skill}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
