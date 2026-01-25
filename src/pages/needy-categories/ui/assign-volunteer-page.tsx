import {Button, Icon} from "@/shared/ui";
import {useNavigate, useParams} from "react-router-dom";
import {useTaskResponses} from "@/entities/taskResponses/hook";
import {CandidatesList} from "@/features/task-candidates/ui";

export const AssignVolunteerPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data: responses, isLoading } = useTaskResponses(id || "");

    // Сделать скелетон
    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="w-full max-w-[393px] min-h-screen m-auto relative bg-white">
            <div className="fixed flex flex-col top-0 left-0 right-0 z-[50] w-[398px] mx-auto bg-gradient-to-b from-blue-50 to-white pt-16 pb-2 px-[20px]">
                <div className="flex gap-2 items-center">
                <div>
                    <Button
                        icon={<Icon iconId="icon-arrow-back"/>} variant="transition" size="sm"
                        onClick={() => navigate(-1)}
                    />
                </div>
                <h1 className="text-[32px] text-[#004573] font-medium">
                    Plumber
                </h1>
                </div>
                <div className="flex flex-col mt-7">
                <span className={"text-[18px] text-[#004573] font-medium"}>Volunteer to help</span>
                <span className={"text-[18px] text-[#5B5B5B] font-normal mt-2"}>You can click on the volunteer's name for more details and confirmation.</span>
                </div>
            </div>
            <div className="pt-[250px] pb-[90px]">
                <div>
                    {responses?.map((task) => <CandidatesList key={task.volunteerId} volunteerId={task.volunteerId} />)}
                </div>
            </div>
        </div>
    )
}