import { useQueryWithErrorHandling } from "@/shared/api/hook/use-query-with-error-handling";
import { userApi } from "@/entities/user";
import { UserWithRoleData } from "../types";

export const useUserById = (userId: string) => {
    return useQueryWithErrorHandling<UserWithRoleData, Error>({
        queryKey: ['user', userId],
        queryFn: () => userApi.getUserById(userId),
        enabled: !!userId,
        staleTime: 1000 * 60 * 5,
    });
};
