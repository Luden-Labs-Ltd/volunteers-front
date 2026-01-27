import { authApi } from '../../api';
import { RefreshTokensRequest, RefreshTokensResponse } from '../types';
import { setToken, setRefreshToken, removeToken, removeRefreshToken } from '@/shared/lib/auth';
import { useMutationWithErrorHandling } from '@/shared/api/hook/use-mutation-with-error-handling';
import { validateApiResponse, isObject, validateRequiredFields } from '@/shared/lib/validation';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export function useRefreshTokens() {
  const { t } = useTranslation();
  
  return useMutationWithErrorHandling<RefreshTokensResponse, Error, RefreshTokensRequest>({
    mutationFn: async (data: RefreshTokensRequest) => {
      // Валидация входных данных
      if (!data.accessToken || !data.refreshToken) {
        throw new Error('Tokens are required');
      }
      
      const response = await authApi.refreshTokens(data);
      
      // Валидация ответа
      return validateApiResponse(
        response,
        (data): data is RefreshTokensResponse => {
          return isObject(data) && 
                 validateRequiredFields(data, ['accessToken', 'refreshToken']);
        },
        'Invalid refresh tokens response format'
      );
    },
    onSuccess: (data) => {
      setToken(data.accessToken);
      setRefreshToken(data.refreshToken);
    },
    onError: (error: unknown) => {
      console.error('Ошибка обновления токенов:', error);

      toast.error(t('auth.sessionExpired'), {
        description: t('auth.sessionExpiredDescription'),
        duration: 5000,
      });

      // При ошибке обновления токенов очищаем токены
      removeToken();
      removeRefreshToken();
    },
  });
}
