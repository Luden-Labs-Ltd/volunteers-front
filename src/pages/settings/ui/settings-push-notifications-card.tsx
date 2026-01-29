import { FC } from 'react';
import { Card } from '@/shared/ui';
import { PushNotificationsSettings } from '@/features/push-notifications-settings/ui';

export const SettingsPushNotificationsCard: FC = () => (
  <Card variant="default" className="p-6">
    <PushNotificationsSettings />
  </Card>
);
