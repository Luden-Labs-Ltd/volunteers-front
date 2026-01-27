import { FC, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { TaskList } from '@/widgets/task-list';
import { Header, IconButton } from '@/shared/ui';
import { useGetMe } from '@/entities/user/model/hooks';
import { Tabs } from "@/shared/ui/tabs";
import userIcon from '@/shared/assets/images/userIcon.webp';
import { useGetTasks } from "@/entities/task/hook";
import { taskApi } from "@/entities/task/api";
import { TaskStatus } from "@/entities/task/model/types";
import { useQueryWithErrorHandling } from "@/shared/api/hook/use-query-with-error-handling";
import { QUERY_KEYS } from "@/shared/api/hook/query-keys";
import {Container} from "@/shared/ui/container";

export const TasksPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: user } = useGetMe();
  const tabs = useMemo(() => [t('tasks.allTasks'), t('tasks.myTasks')], [t]);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { data: allTasks = [], isLoading: allTasksLoading } = useGetTasks();

  // Для волонтеров используем /tasks/assigned, для нуждающихся - /tasks/my
  const getMyTasksFn = user?.role === 'volunteer'
    ? () => taskApi.getAssignedTasks()
    : () => taskApi.getMyTasks();

  const { data: myTasks = [], isLoading: myTasksLoading } = useQueryWithErrorHandling({
    queryKey: [QUERY_KEYS.MY_TASKS, user?.role],
    queryFn: getMyTasksFn,
    enabled: !!user, // Запрос выполняется только если пользователь загружен
  });

  // Фильтруем задачи для волонтеров: в "All tasks" показываем только свободные (ACTIVE и без назначенного волонтера)
  const filteredAllTasks = useMemo(() => {
    if (user?.role === 'volunteer' && activeTab === tabs[0]) {
      return allTasks.filter(task =>
        task.status === TaskStatus.ACTIVE && !task.assignedVolunteerId
      );
    }
    return allTasks;
  }, [allTasks, user?.role, activeTab, tabs]);

  const tasks = useMemo(() => {
    return activeTab === tabs[0] ? filteredAllTasks : myTasks;
  }, [activeTab, filteredAllTasks, myTasks, tabs]);

  const isLoading = activeTab === tabs[0] ? allTasksLoading : myTasksLoading;

  const handleSettingsClick = () => {
    if (user?.role) {
      navigate(`/${user.role}/settings`);
    }
  };

  return (
      <Container className="min-h-screen bg-backgroundImage-light-blue-gradient">
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
        <Tabs tabs={tabs} onChange={setActiveTab} />
        <div className="px-4 py-6  w-full ">
          <TaskList tasks={tasks} isLoading={isLoading} emptyType={activeTab === tabs[0] ? 'all' : 'my'} />
        </div>
      </Container>
  );
};
