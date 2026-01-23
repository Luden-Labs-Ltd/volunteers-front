import {SelectSkills} from "@/entities/skills/ui/select-skills";
import {Button, Textarea} from "@/shared/ui";
import {useState} from "react";
import {Switch} from "@/shared/ui/switch";
import {useTranslation} from "react-i18next";

type TaskDetailsType = {
    skillsIds: string[];
    onBack: () => void;
    onNextTab: () => void;
    onNext: () => void;
}

export const TaskDetails = ({skillsIds, onBack, onNextTab, onNext}: TaskDetailsType) => {
    const [isUrgent, setIsUrgent] = useState(false);
    const { t } = useTranslation();
    const nextButtonHandler = ()=> {
        onNextTab()
        onNext()
    }
    return (
        <div className="pt-[190px] pb-[190px] px-[20px]">
            <div className="w-full h-[223px] flex flex-col justify-end rounded-2xl mb-5 border border-[#162A43] shadow-[1px_1px_0_0_#162A43,2px_2px_0_0_#162A43] p-4 gap-4">
                <div className="flex justify-between items-center w-full">
                            <span className="text-[16px] font-normal text-[#5B5B5B]">
                               {t("taskDetails.checkboxMarkUrgent")}
                            </span>
                    <div className="flex flex-col items-center gap-1">
                        <div className={`text-[16px] font-normal text-[#393939] bg-[#FFFCF2] transition-opacity duration-200 ${isUrgent ? 'opacity-100' : 'opacity-0'}`}>
                            {t("taskDetails.tagUrgent")}
                        </div>
                        <Switch checked={isUrgent} onChange={setIsUrgent} />
                    </div>
                </div>
                <div className="flex justify-between items-center w-full">
                    <span className={"text-[16px] font-normal text-[#5B5B5B]"}>
                        {t("taskDetails.labelAddTime")}
                    </span>
                    <div className={"flex gap-2 "}>
                        {[t("taskDetails.labelDate"),t("taskDetails.labelTime")].map(item=> (
                            <button key={item} className={"py-2 px-4 bg-[#EBF7FF] rounded-3xl text-[#373737] text-[16px] font-normal"}>{item}</button>
                        ))}
                    </div>
                </div>
                <Textarea />
            </div>
            <h2 className={"text-[20px] font-normal mt-6 mb-3"}>
                {t("taskDetails.selectedSkills")}
            </h2>
                <SelectSkills ids={skillsIds}/>
            <div className="fixed z-[1000] bottom-0 left-0 right-0 w-full max-w-[398px] mx-auto bg-white border-t border-blue-50 px-[20px]">
                <div className="pointer-events-auto bg-white mt-5">
                    <Button
                        className={"py-4 border border-[#162A43] shadow-[1px_1px_0_0_#162A43,3px_3px_0_0_#162A43] text-[20px] mb-2"}
                        variant="primary"
                        fullWidth
                        onClick={()=> onBack()}
                    >
                        {t("taskDetails.labelAnythingElse")}
                    </Button>
                    <Button
                        className={"py-4 text-[20px] border-none mb-[20px] active:bg-transparent focus:bg-transparent"}
                        variant="text"
                        fullWidth
                        onClick={nextButtonHandler}
                    >
                        {t("taskDetails.buttonGoToTasks")}
                    </Button>
                </div>
            </div>

            </div>
    )
}