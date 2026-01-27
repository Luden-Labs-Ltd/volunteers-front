import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Card, Header } from '@/shared/ui';
import mission_illustration from '@/shared/assets/images/mission_illustration.webp';

export const TaskPreviewPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { taskId } = useParams();

  const onClickHandler = () => {
    if (taskId) {
      navigate(`/volunteer/tasks/${taskId}`);
    }
  };

  const onLaterClickHandler = () => {
    navigate('/volunteer/tasks');
  };

  return (
    <section className="bg-backGround flex flex-col min-h-screen pt-24 pb-12 px-5 text-center">
      <div className={'flex flex-col gap-8'}>
        <img src={mission_illustration} alt="mission" />
        <div className={'flex flex-col gap-3'}>

            <Header
              title={t('volunteerTask.preview.title')}
              className="border-none bg-transparent py-0"
            />

          <Card className="bg-transparent border-none shadow-none">
            <p>{t('volunteerTask.preview.description')}</p>
          </Card>
        </div>
      </div>
      <div className={' flex flex-col gap-3 mt-auto'}>
        <Button
          size={'lg'}
          fullWidth={true}
          variant={'secondary'}
          onClick={onClickHandler}
        >
          {t('volunteerTask.preview.viewDetails')}
        </Button>
        <Button
          size={'lg'}
          fullWidth={true}
          variant={'white'}
          onClick={onLaterClickHandler}
        >
          {t('volunteerTask.preview.later')}
        </Button>
      </div>
    </section>
  );
};