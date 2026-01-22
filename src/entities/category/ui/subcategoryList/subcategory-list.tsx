import {Skill} from "@/entities/category/model";

type SubcategoryListType = {
    categoryName: string;
    skills: Skill[];
    onSkillClick: (id: string) => void;
    onMissingClick?: () => void;
};

export const SubcategoryList = ({
categoryName,
skills,
onSkillClick,
onMissingClick
}: SubcategoryListType) => {
    return (
        <div className="w-full">
            <h2 className="text-[20px] font-medium mb-5">
                {categoryName}
            </h2>

            <div className="flex flex-col gap-3">
                {skills.map((skill) => (
                    <button
                        key={skill.id}
                        onClick={() => onSkillClick(skill.id)}
                        className="w-full min-h-[58px] flex items-center gap-3 py-2 px-4 rounded-xl bg-white border border-[#F2F2F2] text-left shadow-[1px_1px_0_0_#F2F2F2,2px_2px_0_0_#F2F2F2]"
                    >
                        <div
                            className="w-10 h-10 flex items-center justify-center bg-[#EBF7FF] rounded-xl [&>svg]:w-6 [&>svg]:h-6"
                            dangerouslySetInnerHTML={{ __html: skill.iconSvg }}
                        />

                        <span className="text-[18px] font-normal text-[#5B5B5B]">
              {skill.name}
            </span>
                    </button>
                ))}
                <button
                    onClick={onMissingClick}
                    className="w-full min-h-[58px] flex items-center gap-3 py-2 px-4 rounded-xl bg-white border border-[#F2F2F2] shadow-[1px_1px_0_0_#F2F2F2,2px_2px_0_0_#F2F2F2] text-left text-[18px] font-normal text-[#5B5B5B]"
                >
                    Got a request not listed? Tell us!
                </button>
            </div>
        </div>
    );
};
