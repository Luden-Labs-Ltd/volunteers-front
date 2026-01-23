import { toast } from 'sonner';
import { authApi } from '../../api';
import { SendSmsRequest, SendSmsResponse } from '../types';
import { useMutationWithErrorHandling } from '@/shared/api/hook/use-mutation-with-error-handling';
import { validateApiResponse, isObject } from '@/shared/lib/validation';

export function useSendSms() {
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
      toast.success('SMS код отправлен!', {
        description: isDev
          ? 'Режим разработки: код отправлен в консоль'
          : 'Проверьте ваш телефон и введите полученный код',
        duration: 5000,
      });

      if (isDev) {
        console.log('🔧 DEV MODE: SMS код отправлен для номера', variables.phoneNumber);
      }
    },
  });
}
