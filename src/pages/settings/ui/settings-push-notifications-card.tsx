import { FC } from 'react';
import { Card } from '@/shared/ui';
import { PushNotificationsSettings } from '@/features/push-notifications-settings/ui';

export const SettingsPushNotificationsCard: FC = () => (
  <Card variant="default" className="p-6 border shadow-[1px_1px_0_0_#F2F2F2,2px_2px_0_0_#F2F2F2]">
    <PushNotificationsSettings />
  </Card>
);
