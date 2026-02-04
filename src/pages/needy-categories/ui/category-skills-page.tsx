import { Button } from "@/shared/ui";
import { SelectSubcategoryListItems } from "@/features/select-subcategory-list/ui";
import { useState } from "react";
import { Icon } from "@/shared/ui/Icon";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCreateTaskStore } from "@/features/create-task/model/store.ts";

export const CategorySkillsPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { skillIds, setSkillIds } = useCreateTaskStore();
    const [selectedSkills, setSelectedSkills] = useState<string[]>(skillIds);
    const handleToggleSkill = (skillId: string) => {
        setSelectedSkills(prev => {
            if (prev.includes(skillId)) {
                return prev.filter(id => id !== skillId);
            } else {
                return [...prev, skillId];
            }
        });
    };
    const handleFindVolunteer = () => {
        setSkillIds(selectedSkills);
        navigate("/needy/details");
    };

    return (
        <div className="pt-[calc(170px+env(safe-area-inset-top))] se-only:pt-[140px] pb-[250px] se-only:pb-[200px]  px-[20px]">
            <SelectSubcategoryListItems
                className={"mt-3"}
                selectedIds={selectedSkills}
                onToggle={handleToggleSkill}
            />
            <div className="fixed bottom-[55px] left-1/2 -translate-x-1/2 z-[50] w-full max-w-[393px]">
                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[50] w-full max-w-[393px] bg-white px-5 py-4">
                    <Button
                        onClick={handleFindVolunteer}
                        disabled={selectedSkills.length === 0}
                        className="w-full h-[56px] rounded-xl border border-[#162A43] bg-[#004573] text-white shadow-[3px_3px_0_0_#162A43] text-[20px] font-medium"
                    >
                        {t("categorySkillsView.submitButton")}
                    </Button>
                    <div className="flex mt-3">
                        <div className="mr-2">
                            <Icon iconId={"icon-lock"} size={20}/>
                        </div>
                        <p className={"text-[14px] font-normal text-[#5B5B5B]"}>
                            {t("categorySkillsView.privacyNote")}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}
