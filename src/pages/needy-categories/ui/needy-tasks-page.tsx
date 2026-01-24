import {useTranslation} from "react-i18next";
import {Button, Icon} from "@/shared/ui";

export const NeedyTasksPage = () => {
    const { t } = useTranslation();

    return (
        <div className="absolute pt-[120px] pb-[150px] px-[20px] ">
            <div className="fixed flex justify-between top-0 left-0 right-0 z-[50] w-[398px] mx-auto bg-gradient-to-b from-blue-50 to-white pt-16 pb-2 px-[20px]">
                <h1 className="text-[28px] text-[#004573] font-medium">
                    { t("tasks.myTasks")}
                </h1>
                <div className="">
                    <Button icon={<Icon className={""} iconId={"icon-plus"} />} variant="transition" size="sm" />
                </div>
            </div>
            <h2 className={"text-[18px] font-medium text-[#004573]"}>
                {t("needy.waitingForVolunteers")}
            </h2>
        </div>
    )
}