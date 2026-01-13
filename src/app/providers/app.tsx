import { FC, ReactNode } from 'react';
import { Toaster } from 'sonner';
import { QueryProvider } from './query-provider';
import { Router } from './router';
import '@/shared/lib/i18n';

interface AppProviderProps {
  children?: ReactNode;
}

export const App: FC<AppProviderProps> = ({ children }) => {
  return (
    <QueryProvider>
      <Router />
      {children}
      <Toaster position="top-right" />
    </QueryProvider>
  );
};
