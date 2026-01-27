import {Link} from "react-router-dom";
import {Icon} from "@/shared/ui";
import {UserWithProfile} from "@/entities/user";

export const TaskInfoCard = ({volunteer}: {volunteer : UserWithProfile | undefined}) => {
    return (
        <div className="flex flex-col p-1 rounded-2xl border border-[#F2F2F2] shadow-[1px_1px_0_0_#F2F2F2,3px_3px_0_0_#F2F2F2] mb-4">
            <div className={"flex justify-between py-3 px-5"}>
                <span className={"text-[18px] font-medium text-[#4F4F4F]"}>Volunteer details</span>
                <Link to={`/volunteer/${volunteer?.id}`} className="text-[16px] font-normal text-[#004573]">
                    View profile
                </Link>
            </div>
            <div>
                <div className={"flex gap-3 py-3 px-5 border-t border-[#F2F2F2]"}>
                    <Icon iconId={"icon-phone"} />
                    <a href={`tel:${volunteer?.phone}`}>
                        {volunteer?.phone}
                    </a>
                </div>
                <div className={"flex gap-3 py-3 px-5 border-t border-[#F2F2F2]"}>
                    <Icon iconId={"icon-location"} />
                    <span>{volunteer?.city?.name}</span>
                </div>
            </div>
        </div>
    )
}