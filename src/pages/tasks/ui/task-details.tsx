import {useParams} from "react-router-dom";
import mission_illustration from "@/shared/assets/images/mission_illustration.webp";
import {Button, Card, Header} from "@/shared/ui";
import {t} from "i18next";

export const TaskDetailsPage = () => {

  const { taskId } = useParams()

  return (
    <section className="flex flex-col min-h-screen pt-24 pb-12 px-5 text-center">
      <div className={'flex flex-col gap-8'}>
        <img
          src={mission_illustration}
        />
        <div className={'flex flex-col gap-3'}>
          <Card className="bg-transparent border-none shadow-none">

          </Card>
        </div>
      </div>
      <div className={' flex flex-col gap-3 mt-auto'}>
        <Button size={'lg'} fullWidth={true} variant={'secondary'} onClick={() => {}}>
          The task is complete!
        </Button>
      </div>
    </section>
  )
}