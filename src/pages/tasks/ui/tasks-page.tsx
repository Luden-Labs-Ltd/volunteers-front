import {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {TaskList} from '@/widgets/task-list';
import {Header, IconButton} from '@/shared/ui';
import {useGetMe} from '@/entities/user/model/hooks';
import {Tabs} from "@/shared/ui/tabs";
import userIcon from '@/shared/assets/images/userIcon.webp';
import {useGetTasks} from "@/entities/task/hook";

export const TasksPage: FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {data: user} = useGetMe();
  const tabs = [t('tasks.allTasks'), t('tasks.myTasks')];
  const [, setActiveTab] = useState(tabs[0]);


  const {data: tasks = []} = useGetTasks();

  const handleSettingsClick = () => {
    if (user?.role) {
      navigate(`/${user.role}/settings`);
    }
  };


  return (
    <section className={'mb-12'}>
      <div className="min-h-screen bg-gray-50">
        <Header
          title={t('tasks.title')}
          rightActions={[
            <IconButton
              className="w-8 h-8 rounded-lg drop-shadow-[2px_2px_0_#004573]"
              key="profile"
              variant="ghost"
              aria-label={t('common.profile')}
              icon={
                <img
                  src={userIcon}
                  alt={t('common.profile')}
                  className={"w-full h-full object-cover"}
                />
              }
              onClick={handleSettingsClick}
            />
          ]}
        />
        <Tabs tabs={tabs} onChange={setActiveTab}/>
        <div className="px-4 py-6">
          <TaskList tasks={tasks}/>
        </div>
      </div>
    </section>
  );
};
