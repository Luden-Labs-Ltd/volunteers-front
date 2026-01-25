import { apiClient } from "@/shared/api";
import { User, UserWithRoleData } from "../model/types";
import { validateApiResponse, isObject, validateRequiredFields } from '@/shared/lib/validation';

export const userApi = {
  getMe: async (): Promise<UserWithRoleData> => {
    const response = await apiClient.request<UserWithRoleData>("/auth/user/me");
    return validateApiResponse(
      response,
      (data): data is UserWithRoleData => isObject(data) && validateRequiredFields(data, ['id', 'role']),
      'Invalid user response format'
    );
  },
  getUserById: async (id: string): Promise<UserWithRoleData> => {
    const response = await apiClient.request<UserWithRoleData>(`/user/${id}`);
    return validateApiResponse(
      response,
      (data): data is UserWithRoleData => isObject(data) && validateRequiredFields(data, ['id', 'role']),
      'Invalid user response format'
    );
  },
  updateProfile: async (data: Partial<User>): Promise<UserWithRoleData> => {
    // Валидация данных перед отправкой
    if (data.email !== undefined && data.email !== null && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new Error('Invalid email format');
    }
    if (data.phone !== undefined && data.phone !== null && typeof data.phone !== 'string') {
      throw new Error('Phone must be a string');
    }
    if (data.firstName !== undefined && data.firstName !== null && typeof data.firstName !== 'string') {
      throw new Error('First name must be a string');
    }
    if (data.lastName !== undefined && data.lastName !== null && typeof data.lastName !== 'string') {
      throw new Error('Last name must be a string');
    }
    
    const response = await apiClient.request<UserWithRoleData>("/auth/user/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return validateApiResponse(
      response,
      (data): data is UserWithRoleData => isObject(data) && validateRequiredFields(data, ['id', 'role']),
      'Invalid user response format'
    );
  },
};
