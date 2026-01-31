import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui';
import crown from '@/shared/assets/images/crown.webp';
import {useEffect} from "react";

export const TaskCompletedPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

    // он тут нужен так как на IOS телефлнах будет снизу полоска белая!
    useEffect(() => {
        const originalBodyBg = document.body.style.backgroundColor;
        const rootElement = document.getElementById('root');
        const originalRootBg = rootElement ? rootElement.style.backgroundColor : '';
        document.body.style.backgroundColor = '#F0F5FA';
        if (rootElement) rootElement.style.backgroundColor = '#F0F5FA';

        return () => {
            document.body.style.backgroundColor = originalBodyBg;
            if (rootElement) rootElement.style.backgroundColor = originalRootBg;
        };
    }, []);

  const onClickHandler = () => {
    navigate('/volunteer/tasks');
  };

  return (
    <section className="bg-backGround flex flex-col min-h-screen pt-24 pb-12 px-5 text-center">
      <div className={'flex flex-col gap-8'}>
        <img src={crown} alt="crown" />
        <div className={'flex flex-col gap-3'}>
          <h1 className="border-none bg-transparent py-0 text-2xl text-primary-900">
            {t('volunteerTask.completed.title')}
          </h1>
          <p className="text-textGray font-normal">
            {t('volunteerTask.completed.thankYou')}
          </p>
          <p className="text-textGray font-normal">
            {t('volunteerTask.completed.worldBetter')}
          </p>
        </div>
      </div>
      <div className={' flex flex-col gap-3 mt-auto'}>
        <Button
          size={'lg'}
          fullWidth={true}
          variant={'secondary'}
          onClick={onClickHandler}
        >
          {t('volunteerTask.completed.returnToTasks')}
        </Button>
      </div>
    </section>
  );
};