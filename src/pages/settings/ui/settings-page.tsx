import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Header, Card, Button, Badge } from '@/shared/ui';
import { LanguageSwitcher } from '@/shared/ui/language-switcher';
import { PushNotificationsSettings } from '@/features/push-notifications-settings/ui';
import { useGetMe } from '@/entities/user/model/hooks';

export const SettingsPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: user } = useGetMe();
  const isVolunteer = user?.role === 'volunteer';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title={t('settings.title')}
        backButton
        onBack={() => navigate(-1)}
      />
      <div className="px-4 py-6 space-y-4">
        {/* Информация о пользователе */}
        {user && (
          <Card variant="default" className="p-6 space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {t('settings.profile')}
            </h3>
            {(user.firstName || user.lastName) && (
              <p className="text-gray-800">
                {user.firstName} {user.lastName}
              </p>
            )}
            {user.phone && (
              <p className="text-gray-600 text-sm">
                {user.phone}
              </p>
            )}
          </Card>
        )}

        {/* Скиллы волонтера */}
        {isVolunteer && Array.isArray(user?.profile?.skills) && user.profile.skills.length > 0 && (
          <Card variant="default" className="p-6 space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">
              {t('volunteerDetails.skills')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.profile.skills.map((skill) => (
                <Badge key={skill.id} variant="secondary">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </Card>
        )}

        <Card variant="default" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {t('settings.language')}
            </h3>
            <LanguageSwitcher />
          </div>
        </Card>
        <Card variant="default" className="p-6">
          <PushNotificationsSettings />
        </Card>
        {isVolunteer && (
          <Card variant="default" className="p-6">
            <Button
              size="lg"
              fullWidth
              variant="secondary"
              onClick={() => navigate('/volunteer/leaderboard')}
            >
              {t('leaderboard.title')}
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};
