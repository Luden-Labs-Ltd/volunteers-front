import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {Button, Divider, Switch} from '@/shared/ui';
import { usePushSubscription } from '@/shared/lib/hooks/use-push-subscription';
import {
  subscribeToPushNotifications,
  unsubscribeFromPushNotifications,
  sendTestNotification,
} from '@/entities/notification/api';
import { toast } from 'sonner';
import { handleApiError } from '@/shared/lib/error-handler';

export const PushNotificationsSettings: FC = () => {
  const { t } = useTranslation();
  const {
    isSupported,
    permission,
    isSubscribed,
    isLoading,
    error,
    subscription,
    subscribe,
    unsubscribe,
    requestPermission,
  } = usePushSubscription();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);

  const handleToggle = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      if (isSubscribed) {
        const endpoint = subscription?.endpoint;
        const success = await unsubscribe();
        if (success) {
          await unsubscribeFromPushNotifications(endpoint);
          toast.success(t('notifications.disabled'));
        }
      } else {
        if (permission !== 'granted') {
          const granted = await requestPermission();
          if (!granted) {
            toast.error(t('notifications.permissionDenied'));
            setIsProcessing(false);
            return;
          }
        }

        const subscription = await subscribe();
        if (subscription) {
          await subscribeToPushNotifications(subscription);
          toast.success(t('notifications.enabled'));
        }
      }
    } catch (err) {
      console.error('Error toggling push notifications:', err);
      handleApiError(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusText = () => {
    if (!isSupported) {
      return t('notifications.notSupported');
    }

    if (permission === 'denied') {
      return t('notifications.permissionDenied');
    }

    if (isSubscribed) {
      return t('notifications.statusEnabled');
    }

    if (permission === 'default') {
      return t('notifications.statusDisabled');
    }

    return t('notifications.statusDisabled');
  };

  const getStatusColor = () => {
    if (!isSupported || permission === 'denied') {
      return 'text-red-600';
    }
    if (isSubscribed) {
      return 'text-green-600';
    }
    return 'text-gray-600';
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {t('notifications.title')}
        </h2>
        <div className="text-gray-600">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {t('notifications.title')}
        </h2>
        <p className="text-sm text-gray-600">
          {t('notifications.description')}
        </p>
      </div>

      <Divider />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="font-medium text-gray-900">
              {t('notifications.pushNotifications')}
            </div>
            <div className={`text-sm mt-1 ${getStatusColor()}`}>
              {getStatusText()}
            </div>
          </div>
            <div className="ml-4">
                {isSupported && permission !== 'denied' ? (
                    <Switch
                        checked={isSubscribed}
                        onChange={() => {
                            if (!isProcessing) {
                                handleToggle();
                            }
                        }}
                        className={isProcessing ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
                    />
                ) : (
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={async () => {
                            const granted = await requestPermission();
                            if (!granted) {
                                toast.error(t('notifications.permissionDenied'));
                            }
                        }}
                    >
                        {t('notifications.enable')}
                    </Button>
                )}
            </div>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        {!isSupported && (
          <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
            {t('notifications.notSupported')}
          </div>
        )}

        {permission === 'denied' && (
          <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
            {t('notifications.permissionDeniedHelp')}
          </div>
        )}

        {isSubscribed && (
          <>
            <Divider />
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  {t('notifications.testing')}
                </h3>
                <p className="text-xs text-gray-600 mb-3">
                  {t('notifications.testNotificationDescription')}
                </p>
                <Button
                  onClick={async () => {
                    if (isSendingTest) return;
                    setIsSendingTest(true);
                    try {
                      await sendTestNotification(
                        t('notifications.testNotification'),
                        t('notifications.testNotificationBody'),
                      );
                      toast.success(t('notifications.testNotificationSent'), {
                        description: t('notifications.testNotificationSentDescription'),
                      });
                    } catch (error) {
                      console.error('Error sending test notification:', error);
                      toast.error(t('notifications.testNotificationError'), {
                        description:
                          error instanceof Error
                            ? error.message
                            : t('notifications.testNotificationErrorDescription'),
                      });
                    } finally {
                      setIsSendingTest(false);
                    }
                  }}
                  disabled={isSendingTest}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  {isSendingTest ? t('common.loading') : t('notifications.sendTest')}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
