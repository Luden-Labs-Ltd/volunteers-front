import { useParams, useNavigate } from "react-router-dom";
import { Button, Icon } from "@/shared/ui";
import { UserProfileHeader } from "@/entities/user/ui/user-profile-header";
import { ContactActions } from "@/entities/user/ui/contact-actions";
import { useUserById } from "@/entities/user/model/hooks/use-get-user-by-id.ts";
import { UserWithProfile } from "@/entities/user";
import {SkillsList} from "@/entities/skills/ui/skill-list";

export const VolunteerProfilePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: volunteer, isLoading } = useUserById(id || "");

    if (isLoading) return <div>Loading...</div>;
    if (!volunteer) return <div>Volunteer not found</div>;
    const user = volunteer as UserWithProfile;

    return (
        <div className="w-full min-h-screen mx-auto bg-white pb-10">
            <div className="sticky top-0 z-50 w-full bg-gradient-to-b from-blue-50 to-white/95 backdrop-blur-sm pt-14 pb-4 px-5 border-b border-transparent transition-all">
                <div className="relative w-full flex items-center justify-center min-h-[48px]">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2">
                        <Button
                            icon={<Icon iconId="icon-arrow-back" />}
                            variant="transition"
                            size="sm"
                            onClick={() => navigate(-1)}
                        />
                    </div>
                    <h1 className="text-[24px] text-[#004573] font-medium leading-[1.2] text-center">
                        Volunteer Profile
                    </h1>
                </div>
            </div>
            <div className="px-5 mt-4">
                <UserProfileHeader user={volunteer} />
                <div className="mt-6">
                    <ContactActions phone={volunteer.phone} />
                </div>
                <div className="mt-6">
                    <h3 className="text-[18px] font-medium text-[#393939] mb-3">About</h3>
                    <div className="p-4 rounded-2xl border border-[#F2F2F2] shadow-[1px_1px_0_0_#F2F2F2,3px_3px_0_0_#F2F2F2]">
                        <p className="text-[16px] text-[#5B5B5B] leading-relaxed">
                            {volunteer.about || "No description."}
                        </p>
                    </div>
                </div>
                <SkillsList skills={user.profile.skills} visibleCount={10}/>
            </div>
        </div>
    );
};
