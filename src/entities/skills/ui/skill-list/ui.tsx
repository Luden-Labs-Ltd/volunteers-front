import { useState } from "react";
import {useTranslation} from "react-i18next";
import { Skill } from "@/entities/skills/model";

type SkillsListType = {
    skills?: Skill[];
    visibleCount?: number;
}

export const SkillsList = ({ skills, visibleCount = 5 }: SkillsListType) => {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    if (!skills || skills.length === 0) return null;
    const VISIBLE_COUNT = visibleCount;
    const visibleSkills = isExpanded ? skills : skills.slice(0, VISIBLE_COUNT);
    const remainingCount = skills.length - VISIBLE_COUNT;

    return (
        <div className="mt-6">
            <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-[18px] se-only:text-[16px] font-medium text-[#393939]">{t("volunteerDetails.skills")}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
                {visibleSkills.map((skill) => (
                    <span
                        key={skill.id}
                        className="inline-flex items-center gap-1.5 bg-[#F0F5FA] text-[#004573] px-3 py-1.5 rounded-xl text-[14px] font-medium border border-[#E3F2FD] hover:bg-[#E6F0F9] transition-colors cursor-default"
                    >
            {skill.iconSvg && <span>{skill.iconSvg}</span>}
                        {skill.name}
          </span>
                ))}
                {!isExpanded && remainingCount > 0 && (
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="px-3 py-1.5 text-[14px] font-medium text-[#004573] bg-transparent hover:bg-[#F0F5FA] rounded-xl border border-dashed border-[#004573]/30 transition-all"
                    >
                        +{remainingCount}
                    </button>
                )}
                {isExpanded && skills.length > VISIBLE_COUNT && (
                    <button
                        onClick={() => setIsExpanded(false)}
                        className="px-3 py-1.5 text-[14px] font-medium text-[#004573] bg-transparent hover:bg-[#F0F5FA] rounded-xl border border-dashed border-[#004573]/30 transition-all"
                    >
                        {t("common.hideSkills")}
                    </button>
                )}
            </div>
        </div>
    );
};
