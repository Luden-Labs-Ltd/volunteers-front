import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Badge } from '@/shared/ui';
import { UserWithRoleData, UserWithVolunteerData } from '@/entities/user/model/types';

interface SettingsProfileCardProps {
  user: UserWithRoleData;
}

function getCityName(user: UserWithRoleData): string | undefined {
  if (user.role === 'volunteer') {
    return (user as UserWithVolunteerData).profile?.city?.name;
  }
  return user.city?.name;
}

export const SettingsProfileCard: FC<SettingsProfileCardProps> = ({ user }) => {
  const { t } = useTranslation();
  const cityName = getCityName(user);
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');

  const roleLabelMap: Record<UserWithRoleData['role'], string> = {
    volunteer: t('volunteer.title'),
    needy: t('needy.title'),
    admin: 'Admin',
  };

  const statusLabelMap: Record<string, string> = {
    approved: t('common.success'),
    pending: t('common.loading'),
    rejected: t('task.completed'),
    blocked: t('errors.forbidden'),
  };

  const roleLabel = roleLabelMap[user.role];
  const statusLabel = statusLabelMap[user.status] ?? user.status;

  return (
    <Card variant="default" className="p-6 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {fullName || t('common.profile')}
          </h3>
          {user.phone && (
            <p className="text-gray-600 text-sm mt-1">
              {user.phone}
            </p>
          )}
          {user.email && (
            <p className="text-gray-600 text-sm">
              {user.email}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge variant="success" className="text-xs">
            {roleLabel}
          </Badge>
          <Badge variant="warning" className="text-xs">
            {statusLabel}
          </Badge>
        </div>
      </div>

      {cityName && (
        <p className="text-gray-600 text-sm">
          {t('onboarding.city')}: {cityName}
        </p>
      )}

      {(user.lastLoginAt || user.createdAt) && (
        <div className="text-xs text-gray-500 space-y-1">
          {user.lastLoginAt && (
            <p>
              {t('tasks.status')}: {t('volunteerTask.completed.title')}{' '}
              {/* здесь при желании можно заменить на отдельный ключ i18n */}
            </p>
          )}
          {user.createdAt && (
            <p>
              {t('common.appName')}: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      )}
    </Card>
  );
};
