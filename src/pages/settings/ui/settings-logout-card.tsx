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
    <Card variant="default" className="p-6">
      <Button
        size="lg"
        fullWidth
        variant="error"
        onClick={onLogout}
        disabled={isLoading}
      >
        {isLoading ? t('common.loading') : t('auth.logout')}
      </Button>
    </Card>
  );
};
