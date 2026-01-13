import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TaskList } from '@/widgets/task-list';

export const TasksPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('tasks.title')}</h1>
      <TaskList tasks={[]} />
    </div>
  );
};
