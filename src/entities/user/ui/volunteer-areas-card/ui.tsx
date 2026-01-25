import { cn } from "@/shared/lib";
import { ReactNode } from "react";

type VolunteerArea = {
    id: number;
    name: string;
    tasksCount: number;
    icon: ReactNode | string;
    bgColor: string;
}

type VolunteerAreasCardType = {
    areas: VolunteerArea[];
    title?: string;
}

export const VolunteerAreasCard = ({ areas, title = "Volunteer areas:" }: VolunteerAreasCardType) => {
    return (
        <div className="w-full bg-white rounded-3xl h-[249px] px-6 pt-4 border shadow-[1px_1px_0_0_#F2F2F2,2px_2px_0_0_#F2F2F2] mt-3">
            <h3 className="text-[18px] font-medium text-[#393939] mb-3">
                {title}
            </h3>
            <div className="flex flex-col h-[194px] gap-0 overflow-x-scroll no-scrollbar">
                {areas.map((area) => (
                    <div
                        key={area.id}
                        className={cn(
                            "flex items-center justify-between py-3",
                            "border-t border-[#F2F2F2]"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                                area.bgColor
                            )}>
                                <span className="ml-0.5 text-lg">{area.icon}</span>
                            </div>
                            <span className="text-[16px] font-normal text-[#393939]">
                                {area.name}
                            </span>
                        </div>
                        <span className="text-[16px] text-[#737373] font-normal shrink-0">
                            {area.tasksCount} tasks
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
