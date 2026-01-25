/**
 * Обертка для useQuery с автоматической обработкой ошибок
 */
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { ApiException } from '@/shared/api/types';

export function useQueryWithErrorHandling<TData = unknown, TError = unknown>(
  options: UseQueryOptions<TData, TError>,
): UseQueryResult<TData, TError> {
  return useQuery<TData, TError>({
    ...options,
    retry: (failureCount, error) => {
      // Не повторяем запрос при 401, 403, 404 ошибках
      if (error instanceof ApiException) {
        if (error.isUnauthorized() || error.isForbidden() || error.isNotFound()) {
          return false;
        }
      }
      
      // Используем пользовательскую логику retry или дефолтную
      if (options.retry === false) {
        return false;
      }
      
      if (typeof options.retry === 'function') {
        return options.retry(failureCount, error);
      }
      
      // По умолчанию повторяем максимум 2 раза
      return failureCount < 2;
    },
  });
}
