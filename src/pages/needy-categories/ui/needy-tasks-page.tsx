import {useTranslation} from "react-i18next";
import {Button, Icon} from "@/shared/ui";
import {MyTasksList} from "@/features/my-tasks-list/ui/my-tasks-list.tsx";

export const NeedyTasksPage = () => {
    const { t } = useTranslation();

    return (
        <div className="w-full max-w-[393px] min-h-screen m-auto relative bg-white">
            <div className="fixed flex justify-between top-0 left-0 right-0 z-[50] w-[398px] mx-auto bg-gradient-to-b from-blue-50 to-white pt-16 pb-2 px-[20px]">
                <h1 className="text-[28px] text-[#004573] font-medium">
                    { t("tasks.myTasks")}
                </h1>
                <div>
                    <Button icon={<Icon iconId={"icon-plus"} />} variant="transition" size="sm"/>
                </div>
            </div>
            <div className="pt-[120px] pb-[90px]">
            <MyTasksList />
            </div>
        </div>
    )
}