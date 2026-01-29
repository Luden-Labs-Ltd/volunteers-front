import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/shared/ui';
import { useGetMe } from '@/entities/user/model/hooks';
import { useLogout } from '@/entities/auth/model/hooks';
import { SettingsAvatarCard } from './settings-avatar-card';
import { SettingsProfileCard } from './settings-profile-card';
import { SettingsVolunteerSkillsCard } from './settings-volunteer-skills-card';
import { SettingsLanguageCard } from './settings-language-card';
import { SettingsPushNotificationsCard } from './settings-push-notifications-card';
import { SettingsLeaderboardCard } from './settings-leaderboard-card';
import { SettingsLogoutCard } from './settings-logout-card';
import { UserWithVolunteerData } from '@/entities/user/model/types';

export const SettingsPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: user } = useGetMe();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const isVolunteer = user?.role === 'volunteer';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title={t('settings.title')}
        backButton
        onBack={() => navigate(-1)}
      />
      <div className="px-4 py-6 space-y-4">
        {user && (
          <>
            <SettingsAvatarCard user={user} />
            <SettingsProfileCard user={user} />
          </>
        )}
        {isVolunteer && user && (
          <SettingsVolunteerSkillsCard user={user as UserWithVolunteerData} />
        )}
        <SettingsLanguageCard />
        <SettingsPushNotificationsCard />
        {isVolunteer && <SettingsLeaderboardCard />}
        <SettingsLogoutCard onLogout={() => logout()} isLoading={isLoggingOut} />
      </div>
    </div>
  );
};
