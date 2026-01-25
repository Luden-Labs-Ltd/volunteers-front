import { useUserById } from "@/entities/user/model/hooks/use-get-user-by-id.ts";
import { VolunteerCard } from "@/entities/user/ui/volunteer-card";

export const CandidatesList = ({ volunteerId }: { volunteerId: string }) => {
    const { data: user, isLoading } = useUserById(volunteerId);

    if (isLoading) return <div>Loading...</div>;
    if (!user) return null;

    return (
        <div className="flex flex-col mb-4">
            <VolunteerCard location={"Kisufim"} skills={["Home Cooking", "Maintenance"]}
                volunteer={{
                    ...user,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    photo: user.photo,
                }}
            />
        </div>
    );
};
