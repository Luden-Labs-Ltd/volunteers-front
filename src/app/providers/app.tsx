import { FC, ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { QueryProvider } from './query-provider';
import { Router } from './router';
import { InstallPWAModal } from '@/features/install-pwa/ui';
import { usePWAInstall } from '@/shared/lib/hooks/use-pwa-install';
import '@/shared/lib/i18n';

interface AppProviderProps {
  children?: ReactNode;
}

export const App: FC<AppProviderProps> = ({ children }) => {
  const { isInstallable, isInstalled } = usePWAInstall();
  const [showInstallModal, setShowInstallModal] = useState(false);

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
