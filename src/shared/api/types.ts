/**
 * Типизированные ошибки API для единообразной обработки ошибок
 */

export interface ApiError {
  statusCode: number;
  message: string;
  errors?: string[];
  timestamp?: string;
  path?: string;
}

/**
 * Класс для типизированных ошибок API
 */
export class ApiException extends Error {
  public readonly statusCode: number;
  public readonly errors?: string[];
  public readonly timestamp?: string;
  public readonly path?: string;

  constructor(
    statusCode: number,
    message: string,
    errors?: string[],
    timestamp?: string,
    path?: string,
  ) {
    super(message);
    this.name = 'ApiException';
    this.statusCode = statusCode;
    this.errors = errors;
    this.timestamp = timestamp;
    this.path = path;

    // Поддержка instanceof для наследования
    Object.setPrototypeOf(this, ApiException.prototype);
  }

  /**
   * Создает ApiException из ответа сервера
   */
  static fromResponse(response: Response, data: ApiError): ApiException {
    return new ApiException(
      data.statusCode || response.status,
      data.message || response.statusText,
      data.errors,
      data.timestamp,
      data.path,
    );
  }

  /**
   * Проверяет, является ли ошибка ошибкой валидации (400)
   */
  isValidationError(): boolean {
    return this.statusCode === 400 && !!this.errors;
  }

  /**
   * Проверяет, является ли ошибка ошибкой авторизации (401)
   */
  isUnauthorized(): boolean {
    return this.statusCode === 401;
  }

  /**
   * Проверяет, является ли ошибка ошибкой доступа (403)
   */
  isForbidden(): boolean {
    return this.statusCode === 403;
  }

  /**
   * Проверяет, является ли ошибка ошибкой "не найдено" (404)
   */
  isNotFound(): boolean {
    return this.statusCode === 404;
  }

  /**
   * Проверяет, является ли ошибка ошибкой конфликта (409)
   */
  isConflict(): boolean {
    return this.statusCode === 409;
  }

  /**
   * Проверяет, является ли ошибка ошибкой сервера (500+)
   */
  isServerError(): boolean {
    return this.statusCode >= 500;
  }

  /**
   * Получает все сообщения об ошибках (включая детали валидации)
   */
  getAllMessages(): string[] {
    if (this.errors && this.errors.length > 0) {
      return this.errors;
    }
    return [this.message];
  }
}
