import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '@/shared/ui';

export const SettingsLeaderboardCard: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Card variant="default" className="p-6">
      <Button
        size="lg"
        fullWidth
        variant="secondary"
        className={"border border-[#002640] shadow-[1px_1px_0_0_#002640,2px_2px_0_0_#002640]"}
        onClick={() => navigate('/volunteer/leaderboard')}
      >
        {t('leaderboard.title')}
      </Button>
    </Card>
  );
};
