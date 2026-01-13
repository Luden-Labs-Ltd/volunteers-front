import { useQuery } from "@tanstack/react-query";
import { User, UserRole } from "../types";

export const useGetMe = () => {
  return useQuery<User | null>({
    queryKey: ["user", "me"],
    queryFn: async () => {
      // Проверка токена/авторизации (пока не реализовано)
      // В будущем: return userApi.getMe();

      // Временно проверяем токен из localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        return null;
      }

      // Если токен есть, возвращаем мок данные для разработки
      // В будущем: return userApi.getMe();
      const phone = localStorage.getItem("authPhone") || "+972501234567";
      
      // Временно: для нового пользователя возвращаем волонтера без имени (для онбординга)
      // В будущем: проверка через API, существует ли пользователь
      const mockUser: User = {
        id: "1",
        phone: phone,
        email: null,
        role: "volunteer" as UserRole,
        status: "pending",
        firstName: "",
        lastName: "",
        photo: "",
        about: "",
        programId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return new Promise((resolve) => {
        setTimeout(() => resolve(mockUser), 100);
      });
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
