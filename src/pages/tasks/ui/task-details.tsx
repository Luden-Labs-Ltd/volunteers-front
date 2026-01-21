import {useParams} from "react-router-dom";
import mission_illustration from "@/shared/assets/images/mission_illustration.webp";
import {Button, Card, Header} from "@/shared/ui";
import {t} from "i18next";

export const TaskDetailsPage = () => {

  const { taskId } = useParams()

  return (
    <section className="flex flex-col min-h-screen pt-24 pb-24 px-5 text-center">
      <div className={'flex flex-col gap-8'}>
        <img
          src={mission_illustration}
        />
        <div className={'flex flex-col gap-3'}>
          <h1 className="border-none bg-transparent py-0 text-2xl text-primary-900">
            Shopping at the supermarket
            </h1>
          <p className="text-textGray font-normal">אלומים</p>
          <Card variant={'elevated'} className={'p-4 flex flex-col gap-3 items-start'}>
            <p className="text-textGray font-normal">To carry out the task, please contact</p>
            <p className="text-textGray font-medium">Sara Cohen</p>
            <p className={'text-deepBlue font-normal'}> 📞 050-1234567</p>
            <p className={'text-deepBlue font-normal'}>💬Send a message</p>
            <p className={'text-deepBlue font-normal'}> Send a WhatsApp message</p>
            <p className="text-textGray font-medium">At the end of the task, please let us know that it has been completed, so we can feel at ease🙏</p>
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