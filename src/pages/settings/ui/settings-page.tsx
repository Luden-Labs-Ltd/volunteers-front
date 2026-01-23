import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Header, Card, Button } from '@/shared/ui';
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
