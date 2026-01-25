import { cn } from "@/shared/lib";
import { Task } from "@/entities/task";
import {formatDate} from "@/shared/lib/date";

type TaskBriefProps = {
    task: Task;
    className?: string;
    onClick?: () => void;
}

export const TaskBrief = ({ task, className, onClick }: TaskBriefProps) => {
    const formattedDate = formatDate(task.createdAt);
    const status = task.status.toLowerCase();
    const isActive = status === 'active';
    const subText = isActive
        ? (task.description || "Details: Here the details will appear if written")
        : formattedDate;
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "w-full bg-white flex flex-col gap-3 p-3.5 rounded-2xl text-left transition-all duration-200",
                "border border-[#004573] shadow-[1px_1px_0_0_#004573,3px_3px_0_0_#004573]",
                className
            )}
        >
            <div className="w-full flex items-center gap-3">
                <div className="w-[40px] h-[40px] flex-shrink-0 bg-[#F0F8FF] rounded-lg flex items-center justify-center overflow-hidden">
                    {task.category?.iconSvg ? (
                        <div
                            className="w-6 h-6 [&>svg]:w-full [&>svg]:h-full [&>svg]:fill-[#162A43]"
                            dangerouslySetInnerHTML={{ __html: task.category.iconSvg }}
                        />
                    ) : (
                        <span className="text-xl text-[#162A43]">?</span>
                    )}
                </div>
                <div className="flex-1 min-w-0 flex justify-between items-center">
                    <div className="flex flex-col min-w-0 mr-2">
                        <h3 className="text-[18px] font-medium text-[#393939] truncate">
                            {task.title}
                        </h3>

                        {!isActive && (
                            <span className="text-[14px] font-normal text-[#004573] mt-0.5 truncate -mt-1">
                    {formattedDate}
                </span>
                        )}
                    </div>
                    {isActive && task.firstResponseMode && (
                        <span className="flex-shrink-0 bg-[#FFFCF2] text-[#393939] text-[16px] font-normal px-2 py-0.5 rounded-md whitespace-nowrap">
                Urgent
            </span>
                    )}
                </div>
            </div>

            {isActive && (
                <div className="w-full -mt-1 border-t-2 border-[#F4F6FF]">
                    <p className={cn(
                        "text-[15px] font-normal pt-1 text-[#5B5B5B]"
                    )}>
                        Details: {subText}
                    </p>
                </div>
            )}

        </button>
    )
}
