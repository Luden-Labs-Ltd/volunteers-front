/**
 * Утилиты для валидации данных API ответов
 */

/**
 * Проверяет, что значение не null и не undefined
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Проверяет, что значение является строкой
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Проверяет, что значение является числом
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Проверяет, что значение является массивом
 */
export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

/**
 * Проверяет, что значение является объектом (не null, не массив)
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Валидирует, что объект содержит обязательные поля
 */
export function validateRequiredFields<T extends Record<string, unknown>>(
  data: unknown,
  requiredFields: (keyof T)[],
): data is T {
  if (!isObject(data)) {
    return false;
  }

  for (const field of requiredFields) {
    if (!(field in data) || data[field as string] === null || data[field as string] === undefined) {
      return false;
    }
  }

  return true;
}

/**
 * Валидирует UUID формат
 */
export function isValidUUID(value: unknown): boolean {
  if (!isString(value)) {
    return false;
  }
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

/**
 * Валидирует массив UUID
 */
export function isValidUUIDArray(value: unknown): boolean {
  if (!isArray(value)) {
    return false;
  }
  return value.every((item) => isValidUUID(item));
}

/**
 * Безопасно извлекает значение из объекта с проверкой типа
 */
export function safeGet<T>(obj: unknown, key: string, validator: (value: unknown) => value is T): T | undefined {
  if (!isObject(obj) || !(key in obj)) {
    return undefined;
  }
  const value = obj[key];
  return validator(value) ? value : undefined;
}

/**
 * Валидирует ответ API с проверкой структуры
 */
export function validateApiResponse<T>(
  data: unknown,
  validator: (data: unknown) => data is T,
  errorMessage = 'Invalid API response',
): T {
  if (!validator(data)) {
    console.error('[Validation Error]', errorMessage, data);
    throw new Error(errorMessage);
  }
  return data;
}
