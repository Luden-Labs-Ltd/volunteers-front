import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import Lottie from 'lottie-react';
import mission_illustration from '@/shared/assets/images/mission_illustration.webp';
import { Button, Card, Badge, Header } from '@/shared/ui';
import { useGetTaskById } from '@/entities/task/hook/useGetTaskId';
import { useCompleteTask } from '@/entities/task/hook/useCompleteTask';
import { useGetMe } from '@/entities/user';
import { useUserById } from '@/entities/user/model/hooks/use-get-user-by-id';
import { useTaskResponses, useVolunteerResponse, useRespondToTask } from '@/entities/taskResponses/hook';
import { TaskStatus, TaskResponseStatus, TaskApproveRole } from '@/entities/task/model/types';
import { VolunteerCard } from '@/entities/user/ui/volunteer-card';
import smsIcon from '@/shared/assets/images/sms.webp';
import phoneIcon from '@/shared/assets/images/phone.webp';
import watsappIcon from '@/shared/assets/images/watsapp.webp';
import successAnimation from '@/shared/assets/animations/confetti.json';

export const TaskDetailsPage = () => {
  const { t } = useTranslation();
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { data: task, isLoading, isError, refetch: refetchTask } = useGetTaskById(taskId);
  const { data: user } = useGetMe();

  // Получаем информацию о назначенном волонтере (для нуждающихся)
  const { data: assignedVolunteer } = useUserById(
    user?.role === 'needy' && task?.assignedVolunteerId ? task.assignedVolunteerId : ''
  );

  // Для нуждающихся используем useTaskResponses, для волонтеров - useVolunteerResponse
  const { refetch: refetchResponses } = useTaskResponses(
    user?.role === 'needy' ? (taskId || '') : ''
  );
  const { data: volunteerResponse, refetch: refetchVolunteerResponse } = useVolunteerResponse(
    user?.role === 'volunteer' ? user.id : undefined,
    user?.role === 'volunteer' ? (taskId || '') : undefined
  );

  const { mutate: completeTask, isPending: isCompleting } = useCompleteTask();
  const { mutate: respondToTask, isPending: isResponding } = useRespondToTask();

  // Проверяем, назначена ли задача волонтеру
  const isAssignedToMe = task?.assignedVolunteerId === user?.id;

  // Определяем путь назад в зависимости от роли
  const backPath = user?.role === 'needy' ? '/needy/tasks' : '/volunteer/tasks';

  // Проверяем, находится ли волонтер в той же программе, что и задача
  const isInSameProgram = useMemo(() => {
    if (!task?.programId || user?.role !== 'volunteer') return false;
    const volunteerPrograms = user.profile?.programs || [];
    return volunteerPrograms.some((program) => program.id === task.programId);
  }, [task?.programId, user]);

  // Определяем, можно ли завершить задачу
  // Для волонтера: если задача назначена ему и в статусе IN_PROGRESS
  // Для нуждающегося: если задача в статусе IN_PROGRESS и назначен волонтер
  const canCompleteAsVolunteer = isAssignedToMe && task?.status === TaskStatus.IN_PROGRESS;
  const canCompleteAsNeedy = user?.role === 'needy' && 
                              task?.status === TaskStatus.IN_PROGRESS && 
                              task?.assignedVolunteerId &&
                              !task.approveBy?.includes(TaskApproveRole.NEEDY);
  const canComplete = canCompleteAsVolunteer || canCompleteAsNeedy;

  // Определяем, можно ли откликнуться (если не назначена, не откликался, задача активна, и в той же программе)
  const canRespond =
    !isAssignedToMe &&
    !volunteerResponse &&
    task?.status === TaskStatus.ACTIVE &&
    isInSameProgram;

  // Определяем статус отклика
  const responseStatus = volunteerResponse?.status;

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
              if (user?.role === 'needy') {
                navigate(`/needy/tasks`);
              } else {
                navigate(`/volunteer/tasks/${taskId}/completed`);
              }
            }}
          />
        </div>
      )}
      <div className={"fixed top-0 left-0 w-full z-50"}>
        <Header
          className={'pt-24'}
          backButton
          onBack={() => navigate(backPath)}
        />
      </div>
      <section className="flex flex-col min-h-screen pt-24 px-5 text-center gap-4">
        <div className={'flex flex-col gap-8'}>
          <img
            src={mission_illustration}
          />
          <div className={'flex flex-col gap-3'}>
            <h1 className="border-none bg-transparent py-0 text-2xl text-primary-900">
              {task?.title}
            </h1>
            <p className="text-textGray font-normal">{task.address}</p>

            {/* Информация о назначенном волонтере (для нуждающихся) */}
            {user?.role === 'needy' && task?.assignedVolunteerId && assignedVolunteer && (
              <Card variant={'elevated'} className={'p-4 flex flex-col gap-3 items-start text-left w-full'}>
                <p className="text-textGray font-normal text-lg font-medium mb-2">
                  {t('taskResponses.assignedVolunteer') || 'Назначенный волонтер:'}
                </p>
                <VolunteerCard
                  location={
                    assignedVolunteer.role === 'volunteer' && assignedVolunteer.profile && 'city' in assignedVolunteer.profile && assignedVolunteer.profile.city
                      ? assignedVolunteer.profile.city.name
                      : ''
                  }
                  skills={
                    assignedVolunteer.role === 'volunteer' && assignedVolunteer.profile && 'skills' in assignedVolunteer.profile
                      ? (assignedVolunteer.profile.skills || []).map((skill: { name: string }) => skill.name)
                      : []
                  }
                  volunteer={{
                    ...assignedVolunteer,
                    firstName: assignedVolunteer.firstName,
                    lastName: assignedVolunteer.lastName,
                    photo: assignedVolunteer.photo,
                  }}
                />
              </Card>
            )}

            <Card variant={'elevated'} className={'p-4 flex flex-col gap-3 items-start text-left w-full'}>
              <p className="text-textGray font-normal">
                {user?.role === 'needy'
                  ? (t('taskResponses.taskOwner') || 'Владелец задачи:')
                  : t('volunteerTask.details.contactTitle')
                }
              </p>
              <p className="text-textGray font-medium">
                {task.needy?.firstName} {task.needy?.lastName}
              </p>
              {/* Показываем адрес только если задача назначена волонтеру (IN_PROGRESS) */}
              {isAssignedToMe && task.status === TaskStatus.IN_PROGRESS && task.address && (
                <div className="w-full">
                  <p className="text-textGray font-normal text-sm mb-1">
                    {t('volunteerTask.details.address') || 'Адрес:'}
                  </p>
                  <p className="text-textGray font-medium">
                    {task.address}
                  </p>
                </div>
              )}
              {/* Показываем контакты только если задача назначена волонтеру или волонтер откликнулся */}
              {(isAssignedToMe || volunteerResponse) && task.needy?.phone && (
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
              {/* Показываем заметку о завершении только для волонтеров */}
              {user?.role === 'volunteer' && (
                <p className="text-textGray font-medium text-left w-80">
                  {t('volunteerTask.details.completionNote')}
                </p>
              )}
            </Card>
          </div>
        </div>
        <div className={' flex flex-col gap-3 mt-auto'}>
          {/* Кнопка "Завершить выполнение" - только если задача назначена */}
          {canComplete && (
            <Button
              size={'lg'}
              fullWidth
              variant={'secondary'}
              disabled={isCompleting}
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
          )}

          {/* Кнопка "Я готов взять ее" - если можно откликнуться */}
          {canRespond && (
            <Button
              size={'lg'}
              fullWidth
              variant={'secondary'}
              disabled={isResponding}
              onClick={() => {
                respondToTask(taskId, {
                  onSuccess: () => {
                    // Принудительно обновляем данные после отклика
                    if (user?.role === 'volunteer') {
                      refetchVolunteerResponse();
                    } else {
                      refetchResponses();
                    }
                    refetchTask();
                  },
                });
              }}
            >
              {t('volunteerTask.details.respondButton') || 'Я готов взять ее'}
            </Button>
          )}

          {/* Предупреждение, если волонтер не в той же программе */}
          {!isAssignedToMe &&
            !volunteerResponse &&
            task?.status === TaskStatus.ACTIVE &&
            !isInSameProgram && (
              <div className="text-center py-4">
                <Badge variant="warning">
                  {t('volunteerTask.details.differentProgram') || 'Другая программа'}
                </Badge>
                <p className="text-sm text-gray-600 mt-2">
                  {t('volunteerTask.details.differentProgramDescription') || 'Вы не можете откликнуться на эту задачу, так как она относится к другой программе, в которой вы не участвуете.'}
                </p>
              </div>
            )}

          {/* Статус ожидания одобрения */}
          {volunteerResponse && responseStatus === TaskResponseStatus.PENDING && (
            <div className="text-center py-4">
              <Badge variant="default">
                {t('volunteerTask.details.waitingApproval') || 'Ожидание одобрения'}
              </Badge>
              <p className="text-sm text-gray-600 mt-2">
                {t('volunteerTask.details.waitingApprovalDescription') || 'Ваш отклик отправлен. Ожидайте одобрения от нуждающегося.'}
              </p>
            </div>
          )}

          {/* Статус отклонения */}
          {volunteerResponse && responseStatus === TaskResponseStatus.REJECTED && (
            <div className="text-center py-4">
              <Badge variant="warning">
                {t('volunteerTask.details.rejected') || 'Отклик отклонен'}
              </Badge>
            </div>
          )}
        </div>
      </section>
    </>
  )
}