import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authApi } from '../../api';
import { VerifySmsRequest, AuthResponse } from '../types';
import { setToken, setRefreshToken } from '@/shared/lib/auth';
import { useMutationWithErrorHandling } from '@/shared/api/hook/use-mutation-with-error-handling';
import { validateApiResponse, isObject, validateRequiredFields } from '@/shared/lib/validation';
import { handleApiError } from '@/shared/lib/error-handler';

export function useVerifySms() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutationWithErrorHandling<AuthResponse, Error, VerifySmsRequest>({
    mutationFn: async (data: VerifySmsRequest) => {
      const response = await authApi.verifySms(data);
      
      // Валидация ответа
      return validateApiResponse(
        response,
        (data): data is AuthResponse => {
          return isObject(data) && 
                 validateRequiredFields(data, ['accessToken', 'refreshToken', 'user']);
        },
        'Invalid verify SMS response format'
      );
    },
    onSuccess: async (data) => {
      // Валидация данных ответа - проверяем что все обязательные поля присутствуют
      if (!data || !data.accessToken || !data.refreshToken || !data.user) {
        console.error('Некорректные данные ответа:', data);
        toast.error('Ошибка входа', {
          description: 'Получены некорректные данные от сервера',
          duration: 5000,
        });
        throw new Error('Некорректные данные ответа от сервера');
      }

      try {
        // Сохраняем токены в localStorage
        setToken(data.accessToken);
        setRefreshToken(data.refreshToken);

        // Устанавливаем данные пользователя в кэш БЕЗ перезапроса
        // Это предотвращает возможную 401 ошибку при refetch сразу после логина
        queryClient.setQueryData(['user', 'me'], data.user);

        // Показываем успешное уведомление
        toast.success('Добро пожаловать!', {
          description: `Привет, ${data.user.firstName || data.user.phone || 'Пользователь'}! Вы успешно вошли в систему`,
          duration: 4000,
        });

        // Отправляем событие об успешной авторизации для запроса push-уведомлений
        window.dispatchEvent(new CustomEvent('user-authenticated', { detail: { user: data.user } }));

        // Редирект на основе роли пользователя
        // Если новый пользователь (нет firstName) - на онбординг
        // Если существующий - на главную по роли
        if (!data.user.firstName && data.user.role === 'volunteer') {
          navigate('/volunteer/onboarding', { replace: true });
        } else {
          const roleRoutes: Record<string, string> = {
            volunteer: '/volunteer',
            needy: '/needy',
            admin: '/admin',
          };
          const redirectPath = roleRoutes[data.user.role] || '/auth';
          navigate(redirectPath, { replace: true });
        }
      } catch (error) {
        console.error('Ошибка при сохранении токенов:', error);
        toast.error('Ошибка входа', {
          description: 'Не удалось сохранить данные авторизации',
          duration: 5000,
        });
        throw error;
      }
    },
    onError: (error: unknown) => {
      console.error('Ошибка верификации SMS:', error);
      handleApiError(error);
    },
  });
}
