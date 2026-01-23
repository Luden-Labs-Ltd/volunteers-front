import { FC, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { handleApiError, handleNetworkError } from '@/shared/lib/error-handler';
import { ApiException } from '@/shared/api/types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // Не повторяем запрос при 401, 403, 404 ошибках
        if (error instanceof ApiException) {
          if (error.isUnauthorized() || error.isForbidden() || error.isNotFound()) {
            return false;
          }
        }
        // Повторяем максимум 1 раз для других ошибок
        return failureCount < 1;
      },
      staleTime: 5 * 60 * 1000,
      onError: (error) => {
        // Глобальная обработка ошибок для всех queries
        if (error instanceof ApiException) {
          handleApiError(error);
        } else {
          handleNetworkError(error);
        }
      },
    },
    mutations: {
      onError: (error) => {
        // Глобальная обработка ошибок для всех mutations
        if (error instanceof ApiException) {
          handleApiError(error);
        } else {
          handleNetworkError(error);
        }
      },
    },
  },
});

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
