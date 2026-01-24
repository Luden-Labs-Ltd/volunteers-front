import { SelectedSkillsSkeleton } from "@/shared/ui/skeleton/SelectedSkillsSkeleton";
import {SkillCardItem} from "@/entities/skills/ui/select-skills/ui.tsx";
import {useGetSkillById} from "@/entities/skills/hook";

export const SelectSkills = ({ ids }: { ids: string[] }) => {
    const skillsResults = useGetSkillById(ids);

    if (!ids.length) return null;

    return (
        <div className="flex flex-col gap-3">
            {skillsResults.map((result, index) => {
                if (result.isLoading) {
                    return (
                        <SelectedSkillsSkeleton key={index} />
                    );
                }

                const skill = result.data;
                if (!skill) return null;

                return <SkillCardItem key={skill.id} skill={skill} />;
            })}
        </div>
    );
};
