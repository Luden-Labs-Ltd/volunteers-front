import { FC, ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { QueryProvider } from './query-provider';
import { Router } from './router';
import { InstallPWAModal } from '@/features/install-pwa/ui';
import { usePWAInstall } from '@/shared/lib/hooks/use-pwa-install';
import { usePushSubscription } from '@/shared/lib/hooks/use-push-subscription';
import { subscribeToPushNotifications } from '@/entities/notification/api';
import { getToken } from '@/shared/lib/auth/token';
import '@/shared/lib/i18n';

interface AppProviderProps {
  children?: ReactNode;
}

// Безопасное использование localStorage
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn('localStorage.getItem failed:', error);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('localStorage.setItem failed:', error);
    }
  },
};

export const App: FC<AppProviderProps> = ({ children }) => {
  const { isInstallable, isInstalled } = usePWAInstall();
  const { subscribe, isSubscribed, isSupported, permission, requestPermission } = usePushSubscription();
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [permissionRequested, setPermissionRequested] = useState(false);

  // Автоматический запрос разрешения и подписка на push-уведомления после авторизации
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const token = getToken();
    if (!token) {
      if (import.meta.env.DEV) {
        console.log('🔔 Push: Нет токена, подписка отложена');
      }
      return;
    }

    if (!isSupported) {
      if (import.meta.env.DEV) {
        console.log('🔔 Push: Не поддерживается браузером');
      }
      return;
    }

    if (import.meta.env.DEV) {
      console.log('🔔 Push: Состояние', {
        isSupported,
        permission,
        isSubscribed,
        permissionRequested,
      });
    }

    // Если разрешение еще не запрошено, запрашиваем его
    if (permission === 'default' && !permissionRequested) {
      if (import.meta.env.DEV) {
        console.log('🔔 Push: Запрашиваем разрешение...');
      }
      setPermissionRequested(true);
      requestPermission().then((granted) => {
        if (import.meta.env.DEV) {
          console.log('🔔 Push: Разрешение получено:', granted);
        }
        if (granted && !isSubscribed) {
          subscribe().then(async (subscription) => {
            if (subscription) {
              if (import.meta.env.DEV) {
                console.log('🔔 Push: Подписка создана, отправляем на сервер...');
              }
              try {
                await subscribeToPushNotifications(subscription);
                if (import.meta.env.DEV) {
                  console.log('✅ Push: Подписка успешно зарегистрирована');
                }
              } catch (error) {
                console.error('❌ Push: Ошибка регистрации подписки:', error);
              }
            }
          });
        }
      });
      return;
    }

    // Если разрешение уже получено, подписываемся
    if (permission === 'granted' && !isSubscribed) {
      if (import.meta.env.DEV) {
        console.log('🔔 Push: Разрешение есть, создаем подписку...');
      }
      subscribe().then(async (subscription) => {
        if (subscription) {
          if (import.meta.env.DEV) {
            console.log('🔔 Push: Подписка создана, отправляем на сервер...');
          }
          try {
            await subscribeToPushNotifications(subscription);
            if (import.meta.env.DEV) {
              console.log('✅ Push: Подписка успешно зарегистрирована');
            }
          } catch (error) {
            console.error('❌ Push: Ошибка регистрации подписки:', error);
          }
        }
      });
    }
  }, [isSupported, permission, isSubscribed, subscribe, requestPermission, permissionRequested]);

  useEffect(() => {
    if (!isInstalled) {
      const hasSeenModal = safeLocalStorage.getItem('pwa-install-modal-seen');
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
    safeLocalStorage.setItem('pwa-install-modal-seen', 'true');
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
