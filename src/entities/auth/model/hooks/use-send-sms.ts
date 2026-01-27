import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { authApi } from '../../api';
import { SendSmsRequest, SendSmsResponse } from '../types';
import { useMutationWithErrorHandling } from '@/shared/api/hook/use-mutation-with-error-handling';
import { validateApiResponse, isObject } from '@/shared/lib/validation';

export function useSendSms() {
  const { t } = useTranslation();
  
  return useMutationWithErrorHandling<SendSmsResponse, Error, SendSmsRequest>({
    mutationFn: async (data: SendSmsRequest) => {
      const response = await authApi.sendSms(data);
      
      // Валидация ответа
      return validateApiResponse(
        response,
        (data): data is SendSmsResponse => isObject(data),
        'Invalid send SMS response format'
      );
    },
    onSuccess: (_, variables) => {
      const isDev = variables.isDev;
      toast.success(t('auth.codeSent'), {
        description: isDev
          ? t('auth.codeSentDescription')
          : t('auth.codeSentDescriptionProduction'),
        duration: 5000,
      });

      if (isDev) {
        console.log('🔧 DEV MODE: SMS code sent for number', variables.phoneNumber);
      }
    },
  });
}
