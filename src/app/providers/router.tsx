import { FC } from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { AuthPage } from '@/pages/auth/ui';
import { TasksPage } from '@/pages/tasks/ui';
import { UIKitPage } from '@/pages/ui-kit/ui';
import { OnboardingPage } from '@/pages/volunteer-onboarding/ui';
import { LeaderboardPage } from '@/pages/leaderboard/ui';
import { SettingsPage } from '@/pages/settings/ui';
import { PrivateRoute } from './private-route';
import { RoleRedirect } from './role-redirect';
import {NeedyLayout} from "@/pages/needy-categories";
import {CategoriesPage, CategorySkillsPage, NeedyTasksPage, TaskDetailsPage} from "@/pages/needy-categories/ui";

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
        {/* Онбординг волонтера */}
        <Route
          path="/volunteer/onboarding"
          element={
            <PrivateRoute allowedRoles={['volunteer']}>
              <OnboardingPage />
            </PrivateRoute>
          }
        />

        {/* Редирект на основе роли */}
        <Route path="/" element={<RoleRedirect />} />

        {/* Роуты для волонтеров */}
        <Route
          path="/volunteer"
          element={
            <PrivateRoute allowedRoles={['volunteer']}>
              <TasksPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/volunteer/tasks"
          element={
            <PrivateRoute allowedRoles={['volunteer']}>
              <TasksPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/volunteer/leaderboard"
          element={
            <PrivateRoute allowedRoles={['volunteer']}>
              <LeaderboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/volunteer/settings"
          element={
            <PrivateRoute allowedRoles={['volunteer']}>
              <SettingsPage />
            </PrivateRoute>
          }
        />

          <Route path="/needy" element={
              <PrivateRoute allowedRoles={['needy']}>
                  <NeedyLayout />
              </PrivateRoute>
          }>
              {/* Редирект по умолчанию на категории */}
              <Route index element={<Navigate to="categories" replace />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="skills" element={<CategorySkillsPage />} />
              <Route path="details" element={<TaskDetailsPage />} />
              <Route path="tasks" element={<NeedyTasksPage />} />
          </Route>

        <Route
          path="/needy/tasks"
          element={
            <PrivateRoute allowedRoles={['needy']}>
              <TasksPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/needy/settings"
          element={
            <PrivateRoute allowedRoles={['needy']}>
              <SettingsPage />
            </PrivateRoute>
          }
        />

        {/* Роуты для админов */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <div>Admin Panel</div>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
