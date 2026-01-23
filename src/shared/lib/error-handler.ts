/**
 * Централизованный обработчик ошибок API
 */
import { ApiException } from '@/shared/api/types';
import { toast } from 'sonner';
import { t } from 'i18next';

/**
 * Обрабатывает ошибки API и показывает пользователю понятные сообщения
 */
export function handleApiError(error: unknown): void {
  if (error instanceof ApiException) {
    // 401 ошибка обрабатывается в ApiClient (редирект на /auth)
    if (error.isUnauthorized()) {
      return;
    }

    // Ошибки валидации (400 с массивом errors)
    if (error.isValidationError()) {
      const errors = error.getAllMessages();
      toast.error(t('errors.validation'), {
        description: errors.join(', '),
        duration: 5000,
      });
      return;
    }

    // Ошибка доступа (403)
    if (error.isForbidden()) {
      toast.error(t('errors.forbidden'), {
        description: t('errors.forbiddenDescription'),
        duration: 5000,
      });
      return;
    }

    // Ресурс не найден (404)
    if (error.isNotFound()) {
      toast.error(t('errors.notFound'), {
        description: t('errors.notFoundDescription'),
        duration: 5000,
      });
      return;
    }

    // Конфликт (409)
    if (error.isConflict()) {
      toast.error(t('errors.conflict'), {
        description: error.message,
        duration: 5000,
      });
      return;
    }

    // Ошибка сервера (500+)
    if (error.isServerError()) {
      toast.error(t('errors.serverError'), {
        description: t('errors.serverErrorDescription'),
        duration: 5000,
      });
      // Логируем детали для отладки
      console.error('[Server Error]', {
        statusCode: error.statusCode,
        message: error.message,
        path: error.path,
        timestamp: error.timestamp,
      });
      return;
    }

    // Общая ошибка клиента (400-499, кроме уже обработанных)
    if (error.statusCode >= 400 && error.statusCode < 500) {
      toast.error(t('errors.clientError'), {
        description: error.message,
        duration: 5000,
      });
      return;
    }

    // Неизвестная ошибка
    toast.error(t('errors.general'), {
      description: error.message,
      duration: 5000,
    });
  } else if (error instanceof Error) {
    // Обычная ошибка JavaScript
    toast.error(t('errors.general'), {
      description: error.message,
      duration: 5000,
    });
    console.error('[Error]', error);
  } else {
    // Неизвестный тип ошибки
    toast.error(t('errors.unknown'));
    console.error('[Unknown Error]', error);
  }
}

/**
 * Проверяет, является ли ошибка сетевой ошибкой (offline, timeout)
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError) {
    return (
      error.message.includes('fetch') ||
      error.message.includes('network') ||
      error.message.includes('Failed to fetch')
    );
  }
  return false;
}

/**
 * Обрабатывает сетевые ошибки
 */
export function handleNetworkError(error: unknown): void {
  if (isNetworkError(error)) {
    toast.error(t('errors.network'), {
      description: t('errors.networkDescription'),
      duration: 5000,
    });
  } else {
    handleApiError(error);
  }
}
