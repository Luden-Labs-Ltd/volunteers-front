import { cn } from "@/shared/lib";
import { ReactNode } from "react";
import {useTranslation} from "react-i18next";

type SkillArea = {
    id: string | number;
    name: string;
    tasksCount?: number;
    iconSvg?: string;
    icon?: ReactNode;
    bgColor?: string;
};

type VolunteerAreasCardType = {
    areas: SkillArea[];
    title?: string;
};
const BG_COLORS = ["bg-[#FAD9F5]", "bg-[#BFEAFE]", "bg-[#FEF5C7]"];

export const VolunteerAreasCard = ({ areas, title = "Volunteer areas:" }: VolunteerAreasCardType) => {
    const { t } = useTranslation();

    return (
        <div className="w-full bg-white rounded-3xl min-h-[150px] px-3 pt-4 border shadow-[1px_1px_0_0_#F2F2F2,2px_2px_0_0_#F2F2F2] mt-3 pb-4">
            <h3 className="text-[18px] font-medium text-[#393939] mb-3">
                {title}
            </h3>
            {areas.length === 0 && (
                <div className="text-gray-400 text-sm py-4">No areas selected</div>
            )}

            <div className="flex flex-col gap-0">
                {areas.map((area, index) => {
                    const bgColor = area.bgColor || BG_COLORS[index % BG_COLORS.length];

                    return (
                        <div
                            key={area.id}
                            className={cn(
                                "flex items-center justify-between py-3",
                                index !== 0 && "border-t border-[#F2F2F2]"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 p-2",
                                    bgColor
                                )}>
                                    {area.iconSvg ? (
                                        <div
                                            className="w-full h-full mr-0.5 [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain"
                                            dangerouslySetInnerHTML={{ __html: area.iconSvg }}
                                        />
                                    ) : (
                                        <span className="text-lg">{area.icon || "🔧"}</span>
                                    )}
                                </div>
                                <span className="text-[16px] font-normal text-[#393939]">
                                    {area.name}
                                </span>
                            </div>
                            {typeof area.tasksCount === 'number' && (
                                <span className="text-[16px] text-[#737373] font-normal shrink-0">
                                    {area.tasksCount} {t("taskResponses.tasks")}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
