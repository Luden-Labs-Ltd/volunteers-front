import { FC } from 'react';
import { Button } from '@/shared/ui';

interface RespondToTaskButtonProps {
  taskId: string;
  onRespond: (taskId: string) => void;
}

export const RespondToTaskButton: FC<RespondToTaskButtonProps> = ({ taskId, onRespond }) => {
  return <Button onClick={() => onRespond(taskId)}>Откликнуться</Button>;
};
