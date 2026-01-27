import { apiClient } from '@/shared/api/base-client';
import { validateApiResponse, isObject, validateRequiredFields, isString } from '@/shared/lib/validation';

export interface PushSubscriptionDto {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

/**
 * Подписка на push-уведомления
 */
export async function subscribeToPushNotifications(
  subscription: PushSubscription,
): Promise<void> {
  // Валидация входных данных
  if (!subscription || !subscription.endpoint) {
    throw new Error('Invalid push subscription');
  }
  
  const p256dh = subscription.getKey('p256dh');
  const auth = subscription.getKey('auth');
  
  if (!p256dh || !auth) {
    throw new Error('Missing subscription keys');
  }
  
  const subscriptionData: PushSubscriptionDto = {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: arrayBufferToBase64(p256dh),
      auth: arrayBufferToBase64(auth),
    },
  };

  const response = await apiClient.request<{ success: boolean }>('/notifications/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscriptionData),
  });
  
  // Валидация ответа
  validateApiResponse(
    response,
    (data): data is { success: boolean } => {
      return isObject(data) && 
             validateRequiredFields(data, ['success']);
    },
    'Invalid subscribe response format'
  );
}

/**
 * Отписка от push-уведомлений
 */
export async function unsubscribeFromPushNotifications(
  endpoint?: string,
): Promise<void> {
  // Валидация входных данных
  if (endpoint && !isString(endpoint)) {
    throw new Error('Invalid endpoint format');
  }
  
  await apiClient.request('/notifications/unsubscribe', {
    method: 'DELETE',
    body: endpoint ? JSON.stringify({ endpoint }) : undefined,
  });
}

/**
 * Отправка тестового push-уведомления
 */
export async function sendTestNotification(
  title?: string,
  body?: string,
): Promise<{ success: boolean; message: string }> {
  const response = await apiClient.request<{ success: boolean; message: string }>(
    '/notifications/test-public',
    {
      method: 'POST',
      body: JSON.stringify({
        title: title || '🧪 Test Notification',
        body: body || 'This is a test push notification to verify the system is working',
      }),
    },
  );
  
  // Валидация ответа
  return validateApiResponse(
    response,
    (data): data is { success: boolean; message: string } => {
      return isObject(data) && 
             validateRequiredFields(data, ['success']);
    },
    'Invalid test notification response format'
  );
}

/**
 * Конвертация ArrayBuffer в base64
 */
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
