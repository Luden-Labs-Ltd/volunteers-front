import { FC, ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { QueryProvider } from './query-provider';
import { Router } from './router';
import { InstallPWAModal } from '@/features/install-pwa/ui';
import { usePWAInstall } from '@/shared/lib/hooks/use-pwa-install';
import { usePushSubscription } from '@/shared/lib/hooks/use-push-subscription';
import { subscribeToPushNotifications } from '@/entities/notification/api';
import '@/shared/lib/i18n';

interface AppProviderProps {
  children?: ReactNode;
}

export const App: FC<AppProviderProps> = ({ children }) => {
  const { isInstallable, isInstalled } = usePWAInstall();
  const { subscribe, isSubscribed, isSupported, permission } = usePushSubscription();
  const [showInstallModal, setShowInstallModal] = useState(false);

  // Автоматическая подписка на push-уведомления после авторизации
  useEffect(() => {
    if (
      isSupported &&
      permission === 'granted' &&
      !isSubscribed &&
      typeof window !== 'undefined'
    ) {
      const token = localStorage.getItem('token');
      if (token) {
        subscribe().then(async (subscription) => {
          if (subscription) {
            try {
              await subscribeToPushNotifications(subscription);
            } catch (error) {
              console.error('Failed to register push subscription:', error);
            }
          }
        });
      }
    }
  }, [isSupported, permission, isSubscribed, subscribe]);

  useEffect(() => {
    if (!isInstalled) {
      const hasSeenModal = localStorage.getItem('pwa-install-modal-seen');
      if (!hasSeenModal) {
        const timer = setTimeout(() => {
          setShowInstallModal(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [isInstallable, isInstalled]);

  const handleCloseModal = () => {
    setShowInstallModal(false);
    localStorage.setItem('pwa-install-modal-seen', 'true');
  };

  return (
    <QueryProvider>
      <Router />
      {children}
      <Toaster position="top-right" />
      <InstallPWAModal isOpen={showInstallModal} onClose={handleCloseModal} />
    </QueryProvider>
  );
};
