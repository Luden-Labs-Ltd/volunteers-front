import Lottie from "lottie-react";
import {Button, Icon} from '@/shared/ui';
import {UserProfileHeader} from "@/entities/user/ui/user-profile-header";
import successAnimation from '@/shared/assets/animations/confetti.json';
import {ContactActions} from "@/entities/user/ui/contact-actions";
import {CancelVolunteerSheet} from "@/features/cancel-volunteer-sheet/ui";
import {useTaskDetailsPage} from "@/pages/tasks/modal";
import {VolunteerInfoCard} from "@/entities/user/ui/volunteer-info-card";
import {TaskInfoCard} from "@/entities/task/ui/task-info-card";

export const TaskDetailsPage = () => {
    const {
        task,
        volunteer,
        showAnimation,
        isCancelSheetOpen,
        isProcessing,
        setIsCancelSheetOpen,
        handleComplete,
        handleConfirmCancel,
        handleAnimationComplete,
        navigate
    } = useTaskDetailsPage();

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
      <section className="flex flex-col min-h-screen pt-24 px-5 text-center gap-4 bg-light-blue-gradient">
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
        <div className={' flex flex-col gap-3'}>
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

            <div className="pt-[120px] pb-[210px] px-[20px]">
                <div className={"flex justify-center mb-7"}>
                    <span className={"bg-[#D8FFD6] p-1 rounded-xl text-[16px] font-normal"}>Volunteer found</span>
                </div>
                {volunteer ? (
                    <UserProfileHeader user={volunteer} />
                ) : (
                    <div>Loading volunteer...</div>
                )}
                <ContactActions phone={volunteer?.phone}/>
                <TaskInfoCard volunteer={volunteer}/>
                <VolunteerInfoCard task={task} />
            </div>

            {showAnimation && (
                <div className="fixed inset-0 z-[100] flex items-end justify-center pointer-events-none pb-16">
                    <Lottie
                        animationData={successAnimation}
                        loop={false}
                        className="w-full h-full"
                        onComplete={handleAnimationComplete}
                    />
                </div>
            )}

            <CancelVolunteerSheet
                isOpen={isCancelSheetOpen}
                onClose={() => setIsCancelSheetOpen(false)}
                onConfirm={handleConfirmCancel}
                volunteer={volunteer || null}
                isProcessing={isProcessing}
            />

            <div className="fixed bottom-[69px] left-1/2 -translate-x-1/2 z-[50] w-full max-w-[393px]">
                <div className="w-full bg-white px-5 py-4 border-t border-gray-100">
                    <Button
                        className="w-full h-[48px] rounded-xl border border-[#162A43] bg-[#004573] text-white shadow-[3px_3px_0_0_#162A43] text-[20px] font-medium"
                        onClick={handleComplete}
                        disabled={isProcessing}
                    >
                        Task completed!
                    </Button>
                    <Button
                        onClick={() => setIsCancelSheetOpen(true)}
                        disabled={isProcessing}
                        className="mt-2 w-full h-[48px] rounded-xl border border-[#162A43] bg-white text-[#004573] shadow-[3px_3px_0_0_#162A43] text-[20px] font-medium active:bg-transparent active::bg-transparent"
                    >
                        Cancel volunteer
                    </Button>
                </div>
            </div>
        </div>
    )
}
