import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { TaskList } from '@/widgets/task-list';
import { Header } from '@/shared/ui';
import { programApi } from '@/entities/program';

export const TasksPage: FC = () => {
  const { t } = useTranslation();
  const [selectedProgramId, setSelectedProgramId] = useState<string>('');

  const { data: programs = [], isLoading: isLoadingPrograms } = useQuery({
    queryKey: ['programs'],
    queryFn: () => programApi.getPrograms(),
  });

   const mockTasks = [
    {
      id: 1,
      title: 'Deliver food packages',
      description: 'Deliver food packages to elderly people in the central district.',
      points: 50,
      status: 'open', // open | in_progress | completed
      programId: 'program-1',
      location: 'Central district',
      volunteersNeeded: 5,
      volunteersJoined: 2,
      createdAt: '2026-01-05T10:30:00Z',
      deadline: '2026-01-20T18:00:00Z',
    },
    {
      id: 2,
      title: 'Help at animal shelter',
      description: 'Cleaning enclosures, feeding animals, and helping staff.',
      points: 80,
      status: 'in_progress',
      programId: 'program-2',
      location: 'Green Paw Shelter',
      volunteersNeeded: 10,
      volunteersJoined: 7,
      createdAt: '2026-01-03T09:00:00Z',
      deadline: '2026-01-25T17:00:00Z',
    },
    {
      id: 3,
      title: 'Park cleanup',
      description: 'Collect garbage and sort recyclables in the city park.',
      points: 40,
      status: 'completed',
      programId: 'program-1',
      location: 'Riverside Park',
      volunteersNeeded: 15,
      volunteersJoined: 15,
      createdAt: '2025-12-20T08:00:00Z',
      deadline: '2026-01-10T14:00:00Z',
    },
    {
      id: 4,
      title: 'IT help for seniors',
      description: 'Help elderly people set up smartphones and laptops.',
      points: 60,
      status: 'open',
      programId: 'program-3',
      location: 'Community center',
      volunteersNeeded: 4,
      volunteersJoined: 1,
      createdAt: '2026-01-08T11:15:00Z',
      deadline: '2026-01-22T16:00:00Z',
    },
  ];



  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title={t('tasks.title')}
        rightActions={[
          <select
            key="program-select"
            value={selectedProgramId}
            onChange={(e) => setSelectedProgramId(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-sm min-w-[180px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoadingPrograms}
          >
            <option value="">{t('tasks.allPrograms') || 'All Programs'}</option>
            {programs.map((program) => (
              <option key={program.id} value={program.id}>
                {program.name}
              </option>
            ))}
          </select>,
        ]}
      />
      <div className="px-4 py-6">
        <TaskList tasks={mockTasks} />
      </div>
    </div>
  );
};
