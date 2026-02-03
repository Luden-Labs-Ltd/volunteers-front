import {FC, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {TaskList} from '@/widgets/task-list';
import {Button, Header, Icon} from '@/shared/ui';
import {useGetMe} from '@/entities/user/model/hooks';
import {Tabs} from "@/shared/ui/tabs";
import {useGetTasks} from "@/entities/task/hook";
import {taskApi} from "@/entities/task/api";
import {TaskStatus} from "@/entities/task/model/types";
import {useQueryWithErrorHandling} from "@/shared/api/hook/use-query-with-error-handling";
import {QUERY_KEYS} from "@/shared/api/hook/query-keys";
import {Container} from "@/shared/ui/container";

export const TasksPage: FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {data: user} = useGetMe();
  const tabs = useMemo(() => [t('tasks.allTasks'), t('tasks.myTasks')], [t]);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const {data: allTasks = [], isLoading: allTasksLoading, refetch: refetchAllTasks} = useGetTasks();

  // Для волонтеров используем /tasks/assigned, для нуждающихся - /tasks/my
  const getMyTasksFn = user?.role === 'volunteer'
    ? () => taskApi.getAssignedTasks()
    : () => taskApi.getMyTasks();

  const {data: myTasks = [], isLoading: myTasksLoading, refetch: refetchMyTasks} = useQueryWithErrorHandling({
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
  const isAllTasksTab = activeTab === tabs[0]

  const handleSettingsClick = () => {
    if (user?.role) {
      navigate(`/${user.role}/settings`);
    }
  };

  const handleRefresh = () => {
    if (isAllTasksTab) {
      void refetchAllTasks()
      console.log('prefetchAllTasks')
    } else {
      void refetchMyTasks()
      console.log('prefetchMyTasks')
    }
  };

  return (
    <Container className="min-h-screen bg-light-blue-gradient">
      <Header
        className={'pt-10 pb-5'}
        title={t('tasks.title')}
        rightActions={[
          <div className={'flex justify-center gap-8'}>
            <Button
              className="flex items-center justify-center"
              icon={<Icon
                className="w-8 h-8  text-deepBlue mb-3 mr-3"
                iconId={'refreshBtn'}/>}
              variant="transition"
              size="sm"
              onClick={handleRefresh}/>
            <Button
              className="flex items-center justify-center"
              icon={<Icon
                className="w-5 h-5  text-deepBlue"
                iconId={'iconUser'}/>}
              variant="transition"
              size="sm"
              onClick={handleSettingsClick}/>
          </div>
        ]}
      />
      <Tabs tabs={tabs} onChange={setActiveTab}/>
      <div className="py-6  w-full ">
        <TaskList tasks={tasks} isLoading={isLoading} emptyType={activeTab === tabs[0] ? 'all' : 'my'}/>
      </div>
    </Container>
  );
};
