import { useQuery } from "@tanstack/react-query";
import {userApi} from "@/entities/user";

export const useUserById = (userId: string) => {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: () => userApi.getUserById(userId),
        enabled: !!userId,
        staleTime: 1000 * 60 * 5,
    });
};
