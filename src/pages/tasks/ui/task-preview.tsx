import {Card, Header} from "@/shared/ui";
import {t} from "i18next";
import mission_illustration from '@/shared/assets/images/mission_illustration.webp'

export const TaskPreviewPage = () => {
  return (
    <section className="bg-backGround min-h-screen pt-24 pb-12 px-5 text-center">
      <img
        src={mission_illustration}
      />
      <Header title={t('New details have been received for the task you wanted!')}/>
      <Card>
        <p>Come view the task details now
          so you can schedule a time to complete it</p>
      </Card>

    </section>
  )
}