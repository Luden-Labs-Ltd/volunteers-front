import { FC } from 'react';
import { Task } from '../../model/types';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E6F0FF] shadow-sm p-4 flex justify-between gap-3 active:scale-[0.98] transition">

      <div className="flex flex-col justify-between">

        <span
          className={`
            text-[11px] font-medium px-2 py-0.5 rounded-full w-fit mb-1
            ${task.status === 'active' && 'bg-yellow-100 text-yellow-700'}
            ${task.status === 'in_progress' && 'bg-blue-100 text-blue-700'}
            ${task.status === 'completed' && 'bg-green-100 text-green-700'}
            ${task.status === 'cancelled' && 'bg-red-100 text-red-700'}
          `}
        >
        </span>

        <h3 className="text-[15px] font-semibold text-gray-900 leading-snug">
          {task.title}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          {task}
        </p>

        <p className="text-xs text-blue-600 font-medium mt-1">
          {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="w-[88px] h-[88px] rounded-xl bg-blue-50 flex items-center justify-center overflow-hidden shrink-0">
        <img
          src="/task-placeholder.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};