import { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage } from '@/pages/auth/ui';
import {TasksPage, TaskPreviewPage, TaskCompletionFeedbackPage} from '@/pages/tasks/ui';
import { TaskDetailsPage as VolunteerTaskDetailsPage } from '@/pages/tasks/ui/task-details';
import { TaskCompletedPage } from '@/pages/tasks/ui/task-completed';
import { UIKitPage } from '@/pages/ui-kit/ui';
import { OnboardingPage } from '@/pages/volunteer-onboarding/ui';
import { LeaderboardPage } from '@/pages/leaderboard/ui';
import { SettingsPage } from '@/pages/settings/ui';
import { RoleRedirect } from './role-redirect';
import { ProtectedLayout } from './protected-layout';
import { NeedyLayout } from '@/pages/needy-categories';
import {
  AssignVolunteerPage,
  CategoriesPage,
  CategorySkillsPage,
  NeedyTasksPage,
  TaskDetailsPage,
  CandidateApprovePage,
} from '@/pages/needy-categories/ui';

export const Router: FC = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        {/* Публичные роуты */}
        <Route path="/ui-kit" element={<UIKitPage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Редирект на основе роли */}
        <Route path="/" element={<RoleRedirect />} />

        {/* Роуты для волонтеров */}
        <Route
          element={<ProtectedLayout allowedRoles={['volunteer']} />}
        >
          <Route path="/volunteer/onboarding" element={<OnboardingPage />} />
          <Route path="/volunteer" element={<TasksPage />} />
          <Route path="/volunteer/tasks" element={<TasksPage />} />
          <Route
            path="/volunteer/tasks/:taskId/preview"
            element={<TaskPreviewPage />}
          />
          <Route
            path="/volunteer/tasks/:taskId"
            element={<VolunteerTaskDetailsPage />}
          />
          <Route
            path="/volunteer/tasks/:taskId/completed"
            element={<TaskCompletedPage />}
          />
          <Route
            path="/volunteer/leaderboard"
            element={<LeaderboardPage />}
          />
          <Route path="/volunteer/settings" element={<SettingsPage />} />
        </Route>

        {/* Роуты для нуждающихся */}
        <Route
          element={<ProtectedLayout allowedRoles={['needy']} />}
        >
          <Route
            path="/needy"
            element={<NeedyLayout />}
          >
            <Route index element={<Navigate to="categories" replace />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="skills" element={<CategorySkillsPage />} />
            <Route path="details" element={<TaskDetailsPage />} />
            <Route path="tasks" element={<NeedyTasksPage />} />
            <Route path="tasks/:id/assign" element={<AssignVolunteerPage />} />
            <Route
                  path="/needy/tasks/:taskId/volunteer/:volunteerId/approve"
                  element={<CandidateApprovePage />}
            />
            <Route path="/needy/tasks/:taskId" element={<VolunteerTaskDetailsPage />} />
          </Route>
          <Route path="/needy/tasks" element={<TasksPage />} />
          <Route path="/needy/taskCompletionFeedbackPage" element={<TaskCompletionFeedbackPage />} />
          <Route path="/needy/settings" element={<SettingsPage />} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
};
