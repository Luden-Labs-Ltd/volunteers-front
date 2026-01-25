import { UserWithRoleData } from "../types";
import { authApi } from "@/entities/auth/api";
import { getToken, removeToken, removeRefreshToken } from "@/shared/lib/auth";
import { useState, useEffect } from "react";
import { useQueryWithErrorHandling } from "@/shared/api/hook/use-query-with-error-handling";
import { validateApiResponse, isObject, validateRequiredFields } from "@/shared/lib/validation";
import { ApiException } from "@/shared/api/types";

export const useGetMe = () => {
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = () => {
      const token = getToken();
      setHasToken(!!token);
    };
    checkToken();
  }, []);

  const query = useQueryWithErrorHandling<UserWithRoleData | null>({
    queryKey: ["user", "me"],
    queryFn: async (): Promise<UserWithRoleData | null> => {
      // Бэкенд возвращает UserWithRoleData напрямую, а не объект с полем user
      const response = await authApi.getMe();
      if (!response) {
        return null;
      }
      
      // Валидация ответа
      return validateApiResponse(
        response,
        (data): data is UserWithRoleData => {
          return isObject(data) && 
                 validateRequiredFields(data, ['id', 'role']);
        },
        'Invalid user data response format'
      );
    },
    enabled: hasToken === true, // Выполнять запрос только если есть токен
    staleTime: 5 * 60 * 1000, // 5 минут - данные считаются свежими
    gcTime: 10 * 60 * 1000, // 10 минут - время хранения в кэше
    refetchOnWindowFocus: false, // не перезагружать при фокусе окна
    refetchOnMount: false, // не перезагружать при монтировании
    retry: (failureCount, error: unknown) => {
      // Не повторять запрос при 401 ошибке - interceptor уже обработает это
      if (error instanceof ApiException && error.isUnauthorized()) {
        removeToken();
        removeRefreshToken();
        return false;
      }
      // Повторить максимум 2 раза для других ошибок
      return failureCount < 2;
    },
  });

  // Если токена нет, считаем что загрузка завершена и пользователь не авторизован
  if (hasToken === false) {
    return {
      ...query,
      isLoading: false,
      data: null,
    };
  }

  // Если еще проверяем наличие токена, показываем загрузку
  if (hasToken === null) {
    return {
      ...query,
      isLoading: true,
    };
  }

  return query;
};
