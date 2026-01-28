import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TaskCard } from '@/entities/task';
import { Task } from '@/entities/task/model';
import { Card } from '@/shared/ui';
import mission_illustration from '@/shared/assets/images/mission_illustration.webp';
import taskImage1 from '@/pages/tasks/assets/taskImage1.webp'
import taskImage2 from '@/pages/tasks/assets/taskImage2.webp'

interface TaskListProps {
  tasks: Task[];
  isLoading?: boolean;
  emptyType?: 'all' | 'my';
}

export const TaskList: FC<TaskListProps> = ({ tasks, isLoading = false, emptyType = 'all' }) => {
  const { t } = useTranslation();
  const images = [taskImage1, taskImage2]

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-500">
        {t('common.loading') || 'Loading...'}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card className="p-8 text-center bg-white">
        <div className="mb-6">
          <img
            src={mission_illustration}
            alt={t('tasks.noTasks')}
            className="w-48 h-48 object-contain mx-auto opacity-60"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {emptyType === 'all' 
            ? (t('tasks.empty.all') || 'No tasks available')
            : (t('tasks.empty.my') || 'You have no tasks')
          }
        </h2>
        <p className="text-sm text-gray-600">
          {emptyType === 'all'
            ? (t('tasks.empty.allDescription') || 'There are no tasks available at the moment. Check back later!')
            : (t('tasks.empty.myDescription') || 'You haven\'t responded to any tasks yet. Browse available tasks to get started!')
          }
        </p>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task, index) => {
        const image = images[index % images.length]
        return (
          <TaskCard key={task.id} task={task} image={image}/>
        )
        }
      )}
    </div>
  );
};
