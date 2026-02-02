import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Button } from '@/shared/ui';

interface SettingsLogoutCardProps {
  onLogout: () => void;
  isLoading: boolean;
}

export const SettingsLogoutCard: FC<SettingsLogoutCardProps> = ({ onLogout, isLoading }) => {
  const { t } = useTranslation();

  return (
    <Card variant="default" className="pb-5">
      <Button
        size="lg"
        fullWidth
        variant="error"
        onClick={onLogout}
        disabled={isLoading}
        className={"border border-red-500 shadow-[1px_1px_0_0_#960018,2px_2px_0_0_#960018]"}
      >
        {isLoading ? t('common.loading') : t('auth.logout')}
      </Button>
    </Card>
  );
};
