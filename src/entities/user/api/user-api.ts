import { apiClient } from "@/shared/api";
import { User } from "../model/types";

export const userApi = {
  getMe: () => apiClient.request<User>("/users/me"),
  updateProfile: (data: Partial<User>) =>
    apiClient.request<User>("/users/me", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};
