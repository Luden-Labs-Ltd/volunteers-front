/**
 * Обертка для useMutation с автоматической обработкой ошибок
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { handleApiError, handleNetworkError } from '@/shared/lib/error-handler';
import { ApiException } from '@/shared/api/types';

export function useMutationWithErrorHandling<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
): UseMutationResult<TData, TError, TVariables, TContext> {
  return useMutation<TData, TError, TVariables, TContext>({
    ...options,
    onError: (error: TError, variables: TVariables, context: TContext) => {
      // Обрабатываем ошибки
      if (error instanceof ApiException) {
        handleApiError(error);
      } else {
        handleNetworkError(error);
      }
      
      // Вызываем пользовательский обработчик, если он есть
      options.onError?.(error, variables, context);
    },
  });
}
