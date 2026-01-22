import {useGetSkillById} from "@/entities/skills/hook/useGetSkillById.tsx";
import {SelectedSkills} from "@/features/selected-skills/ui";

export const SelectSkills = ({ ids }: { ids: string[] }) => {
    const skillsResults = useGetSkillById(ids);

    return (
        <div className="flex flex-col gap-3">
            {skillsResults.map((result) => {
                const skill = result.data;
                if (!skill) return null;
                return <SelectedSkills key={skill.id} skill={skill} />;
            })}
        </div>
    );
};