import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { authApi } from '../../api';
import { VerifySmsRequest, AuthResponse } from '../types';
import { setToken, setRefreshToken } from '@/shared/lib/auth';
import { useMutationWithErrorHandling } from '@/shared/api/hook/use-mutation-with-error-handling';
import { validateApiResponse, isObject, validateRequiredFields } from '@/shared/lib/validation';
import { handleApiError } from '@/shared/lib/error-handler';

export function useVerifySms() {
  const { t } = useTranslation();
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
        console.error('Invalid response data:', data);
        toast.error(t('auth.loginError'), {
          description: t('auth.loginErrorDescription'),
          duration: 5000,
        });
        throw new Error(t('auth.invalidResponse'));
      }

      try {
        // Сохраняем токены в localStorage
        setToken(data.accessToken);
        setRefreshToken(data.refreshToken);

        // Устанавливаем данные пользователя в кэш БЕЗ перезапроса
        // Это предотвращает возможную 401 ошибку при refetch сразу после логина
        queryClient.setQueryData(['user', 'me'], data.user);

        // Показываем успешное уведомление
        const userName = data.user.firstName || data.user.phone || 'User';
        toast.success(t('auth.welcome'), {
          description: t('auth.welcomeDescription', { name: userName }),
          duration: 4000,
        });

        // Отправляем событие об успешной авторизации для запроса push-уведомлений
        window.dispatchEvent(new CustomEvent('user-authenticated', { detail: { user: data.user } }));

        // Редирект на основе роли пользователя
        // Если новый пользователь (нет firstName) - на онбординг
        // Если существующий - на главную по роли
        // Полная проверка онбординга будет выполнена в OnboardingPage через useGetMe
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
        console.error('Error saving tokens:', error);
        toast.error(t('auth.loginError'), {
          description: t('auth.loginErrorSaveDescription'),
          duration: 5000,
        });
        throw error;
      }
    },
    onError: (error: unknown) => {
      console.error('SMS verification error:', error);
      handleApiError(error);
    },
  });
}
