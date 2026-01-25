import {useNavigate, useParams} from "react-router-dom";
import {useUserById} from "@/entities/user/model/hooks/use-get-user-by-id.ts";
import {Button, Icon} from "@/shared/ui";
import {UserProfileHeader} from "@/entities/user/ui/user-profile-header";
import {VolunteerAreasCard} from "@/entities/user/ui/volunteer-areas-card";
import {VolunteerReviewsCard} from "@/entities/user/ui/volunteer-reviews-card";

export const CandidateApprovePage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data: user } = useUserById(id || "");
    if (!user) return <div>User not found</div>;

    const areas = [
        {
            id: 1,
            name: "Maintenance",
            tasksCount: 6,
            icon: "️🛠",
            bgColor: "bg-[#FAD9F5]",
        },
        {
            id: 2,
            name: "Technology",
            tasksCount: 3,
            icon: "🖥️",
            bgColor: "bg-[#BFEAFE]",
        },
        {
            id: 3,
            name: "Electricity",
            tasksCount: 3,
            icon: "💡",
            bgColor: "bg-[#FEF5C7]",
        },
        {
            id: 4,
            name: "Repair",
            tasksCount: 4,
            icon: "",
            bgColor: "bg-[#FAD9F5]",
        },
        {
            id: 5,
            name: "Babysitting",
            tasksCount: 9,
            icon: "",
            bgColor: "bg-[#FEF5C7]",
        },
        {
            id: 6,
            name: "Private lessons",
            tasksCount: 12,
            icon: "",
            bgColor: "bg-[#FAD9F5]",
        },
        {
            id: 7,
            name: "Cleanings",
            tasksCount: 3,
            icon: "",
            bgColor: "bg-[#BFEAFE]",
        },
    ];
    const reviews = [
        {
            id: 1,
            authorName: "Sarah M.",
            rating: 5,
            text: "Yossi was an excellent plumber! He arrived quickly, solved the problem professionally, and was very courteous. I highly recommend him to anyone needing plumbing services."
        },
    ];

    return (
        <div className="w-full max-w-[393px] min-h-screen m-auto relative bg-white  px-[20px]">
            <div className="fixed top-0 left-0 right-0 z-[50] w-full max-w-[398px] mx-auto bg-gradient-to-b from-blue-50 to-white pt-16 pb-4 px-5">
                <div className="grid grid-cols-[48px_1fr_48px] items-center">
                    <div className="mb-5">
                        <Button
                            icon={<Icon iconId="icon-arrow-back" />}
                            variant="transition"
                            size="sm"
                            onClick={() => navigate(-1)}
                        />
                    </div>
                    <h1 className="text-[24px] text-[#004573] font-medium text-center leading-tight">
                        Volunteer for the plumber role
                    </h1>
                    <div />
                </div>
            </div>
            <div className="pt-[190px] pb-[170px]">
                {/*Иконка пользвателя*/}
                <UserProfileHeader user={user} />
                {/*Таски*/}
                <VolunteerAreasCard areas={areas} />
                {/*Отзывы*/}
                <VolunteerReviewsCard reviews={reviews} />
            </div>
            {/*<div className="fixed z-[1000] bottom-[calc(72px+env(safe-area-inset-bottom))] left-0 right-0 w-full py-4 max-w-[395px] mx-auto bg-white">*/}
            {/*    <Button*/}
            {/*        className={"py-4 border border-[#162A43] shadow-[1px_1px_0_0_#162A43,3px_3px_0_0_#162A43]"}*/}
            {/*        variant="primary"*/}
            {/*        fullWidth*/}
            {/*    >*/}
            {/*        Approve and Sync Arrival*/}
            {/*    </Button>*/}
            {/*</div>*/}
        </div>
    );
};
