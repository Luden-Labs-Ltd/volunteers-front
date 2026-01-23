import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Lottie from 'lottie-react';
import mission_illustration from '@/shared/assets/images/mission_illustration.webp';
import { Button, Card } from '@/shared/ui';
import { useGetTaskById } from '@/entities/task/hook/useGetTaskId';
import { useCompleteTask } from '@/entities/task/hook/useCompleteTask';
import smsIcon from '@/shared/assets/images/sms.webp';
import phoneIcon from '@/shared/assets/images/phone.webp';
import watsappIcon from '@/shared/assets/images/watsapp.webp';
import successAnimation from '@/shared/assets/animations/confetti.json';

export const TaskDetailsPage = () => {
  const { t } = useTranslation();
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { data: task, isLoading, isError } = useGetTaskById(taskId);
  const { mutate: completeTask, isPending } = useCompleteTask();

  if (!taskId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">{t('volunteerTask.details.invalidLink')}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (isError || !task) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">{t('volunteerTask.details.notFound')}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {showAnimation && (
        <div className="fixed inset-0 z-100 flex items-end justify-center">
          <Lottie
            animationData={successAnimation}
            loop={false}
            className="w-full h-1/2"
            onComplete={() => {
              navigate(`/volunteer/tasks/${taskId}/completed`)
            }}
          />
        </div>
      )}
      <section className="flex flex-col min-h-screen pt-24 pb-24 px-5 text-center gap-4">
        <div className={'flex flex-col gap-8'}>
          <img
            src={mission_illustration}
          />
          <div className={'flex flex-col gap-3'}>
            <h1 className="border-none bg-transparent py-0 text-2xl text-primary-900">
              {task?.title}
            </h1>
            <p className="text-textGray font-normal">{taskId}</p>
            <Card variant={'elevated'} className={'p-4 flex flex-col gap-3 items-start text-left w-full'}>
              <p className="text-textGray font-normal">
                {t('volunteerTask.details.contactTitle')}
              </p>
              <p className="text-textGray font-medium">
                {task.needy?.firstName} {task.needy?.lastName}
              </p>
              {task.needy?.phone && (
                <>
                  <a href={`tel:${task.needy.phone}`}>
                    <p className={'text-deepBlue font-normal flex flex-row items-center gap-2'}>
                      <span>
                        <img
                          src={phoneIcon}
                          className="w-6 h-6 object-contain shrink-0"
                          alt="phone"
                        />
                      </span>
                      <span>{task.needy.phone}</span>
                    </p>
                  </a>
                  <a href={`sms:${task.needy.phone}`}>
                    <p className={'text-deepBlue font-normal flex flex-row items-center gap-2'}>
                      <span>
                        <img
                          src={smsIcon}
                          className="w-6 h-6 object-contain shrink-0"
                          alt="sms"
                        />
                      </span>
                      {t('volunteerTask.details.sendMessage')}
                    </p>
                  </a>
                  <a
                    href={`https://wa.me/${task.needy.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p className={'text-deepBlue font-normal flex flex-row items-center gap-2'}>
                      <span>
                        <img
                          src={watsappIcon}
                          className="w-6 h-6 object-contain shrink-0 rounded-full"
                          alt="whatsapp"
                        />
                      </span>
                      {t('volunteerTask.details.sendWhatsApp')}
                    </p>
                  </a>
                </>
              )}
              <p className="text-textGray font-medium text-left w-80">
                {t('volunteerTask.details.completionNote')}
              </p>
            </Card>
          </div>
        </div>
        <div className={' flex flex-col gap-3 mt-auto'}>
          <Button
            size={'lg'}
            fullWidth
            variant={'secondary'}
            disabled={isPending}
            onClick={() => {
              completeTask(taskId, {
                onSuccess: () => {
                  setShowAnimation(true);
                },
              });
            }}
          >
            {t('volunteerTask.details.completeButton')}
          </Button>
        </div>
      </section>
    </>
  )
}