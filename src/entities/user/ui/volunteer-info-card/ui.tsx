import {Task} from "@/entities/task";

export const VolunteerInfoCard = ({ task }: { task: Task | undefined }) => {
    return (
        <div className="flex flex-col p-1 rounded-2xl border border-[#F2F2F2] shadow-[1px_1px_0_0_#F2F2F2,3px_3px_0_0_#F2F2F2]">
            <div className={"flex py-3 px-5"}>
                <span className={"text-[18px] font-medium text-[#4F4F4F]"}>Task details</span>
            </div>
            <div>
                <div className={"flex justify-between py-3 px-5 border-t border-[#F2F2F2]"}>
                    <div className="flex items-center gap-3">
                        {task?.category?.iconSvg && (
                            <span
                                className="w-6 h-6 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                                dangerouslySetInnerHTML={{ __html: task.category.iconSvg }}
                            />
                        )}
                        <span className={"text-[16px] font-normal text-[#393939]"}>{task?.title}</span>
                    </div>
                    {task?.firstResponseMode && (
                        <span className={"bg-[#FFFCF2] p-1 rounded-lg text-[16px] font-normal"}>Urgent</span>
                    )}
                </div>
                <div className={"flex gap-3 py-3 px-5 border-t border-[#F2F2F2]"}>
                            <span className={"text-[16px] font-normal"}>
                                Details: {task?.description}
                            </span>
                </div>
            </div>
        </div>
    )
}