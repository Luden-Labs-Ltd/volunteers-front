import {UserWithProfile} from "@/entities/user";
import {Icon} from "@/shared/ui";

type UserProfileHeaderType = {
    user: UserWithProfile;
}

export const UserProfileHeader = ({ user }: UserProfileHeaderType) => {
    const displayName = [user.firstName, user.lastName].filter(Boolean).join(" ");
    const photoUrl = (user.photo || "").replace(/^"|"$/g, '');
    const isVerified = user.status === "approved";
    const location = user.city?.name ?? user.profile?.city?.name ?? "Unknown";

    return (
        <div className="w-full flex flex-col items-center px-4 mb-6">
            <div className="relative mb-5">
                <img
                    src={photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
                    alt={displayName}
                    className="w-[76px] h-[76px] rounded-full object-cover shadow-sm bg-gray-100"
                />
            </div>
            <h2 className="text-[18px] font-medium text-[#393939] leading-tight text-center mb-1">
                {displayName}
            </h2>
            <p className="text-[16px] text-[#4F4F4F] font-normal text-center mb-1">
                {location}
            </p>
            {isVerified && (
                <div className="flex items-center gap-1 bg-white rounded-full">
                    <Icon size={16} iconId={"icon-approve"} />
                    <span className="text-[16px] font-normal text-[#00731D]">
                        Verified
                    </span>
                </div>
            )}
        </div>
    );
};
