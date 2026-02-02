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
        <div className="min-h-screen bg-gray-50 pb-[calc(300px+env(safe-area-inset-bottom))]">
            <div className="sticky top-0 z-50 bg-gray-50">
                <Header
                    className={"pt-16"}
                    title={t('settings.title')}
                    backButton
                    onBack={() => navigate(-1)}
                />
            </div>

            <div className="px-4 pt-3 space-y-4 border shadow-[1px_1px_0_0_#F2F2F2,2px_2px_0_0_#F2F2F2]">
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
                <div className="px-5">
                    <SettingsLogoutCard onLogout={() => logout()} isLoading={isLoggingOut} />
                </div>
                <div className="w-full h-[15px] shrink-0" />

            </div>
        </div>
    );
};
