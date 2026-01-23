import { apiClient } from '@/shared/api';
import {
  SendSmsRequest,
  SendSmsResponse,
  VerifySmsRequest,
  AuthResponse,
  RefreshTokensRequest,
  RefreshTokensResponse,
  GetMeResponse,
} from '../model/types';
import { validateApiResponse, isObject, validateRequiredFields, isString } from '@/shared/lib/validation';

export const authApi = {
  // Отправка SMS кода
  sendSms: async (data: SendSmsRequest): Promise<SendSmsResponse> => {
    // Валидация входных данных
    if (!data.phoneNumber || !isString(data.phoneNumber)) {
      throw new Error('Phone number is required');
    }
    
    const payload: Record<string, unknown> = {
      phoneNumber: data.phoneNumber,
      isDev: true,
    };
    
    const response = await apiClient.request<SendSmsResponse>('/auth/user/sms/send', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    
    // Валидация ответа
    return validateApiResponse(
      response,
      (data): data is SendSmsResponse => isObject(data),
      'Invalid send SMS response format'
    );
  },

  // Верификация SMS кода и авторизация
  verifySms: async (data: VerifySmsRequest): Promise<AuthResponse> => {
    // Валидация входных данных
    if (!data.phoneNumber || !data.code) {
      throw new Error('Phone number and code are required');
    }
    
    const response = await apiClient.request<AuthResponse>('/auth/user/sms/verify', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    // Валидация ответа - проверяем обязательные поля
    return validateApiResponse(
      response,
      (data): data is AuthResponse => {
        return isObject(data) && 
               validateRequiredFields(data, ['accessToken', 'refreshToken', 'user']);
      },
      'Invalid verify SMS response format'
    );
  },

  // Обновление токенов
  refreshTokens: async (
    data: RefreshTokensRequest
  ): Promise<RefreshTokensResponse> => {
    // Валидация входных данных
    if (!data.accessToken || !data.refreshToken) {
      throw new Error('Access token and refresh token are required');
    }
    
    const response = await apiClient.request<RefreshTokensResponse>('/auth/user/refresh', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
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

  // Получение данных текущего пользователя
  getMe: async (): Promise<GetMeResponse> => {
    const response = await apiClient.request<GetMeResponse>('/auth/user/me');
    
    // Валидация ответа
    return validateApiResponse(
      response,
      (data): data is GetMeResponse => {
        return isObject(data) && 
               validateRequiredFields(data, ['id', 'role']);
      },
      'Invalid get me response format'
    );
  },

  // Выход из системы
  logout: async (): Promise<{ message: string }> => {
    return apiClient.request<{ message: string }>('/auth/user/logout', {
      method: 'POST',
    });
  },
};
