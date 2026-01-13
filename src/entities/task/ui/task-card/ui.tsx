import { FC } from 'react';
import { Task } from '../../model/types';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: FC<TaskCardProps> = ({ task }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <span>{task.points} баллов</span>
      <span>{task.status}</span>
    </div>
  );
};
