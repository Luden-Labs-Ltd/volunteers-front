import { programApi } from "@/entities/program/api";
import { Program } from "@/entities/program/model/types";
import { QUERY_KEYS } from "@/shared/api/hook/query-keys";
import { useQueryWithErrorHandling } from "@/shared/api/hook/use-query-with-error-handling";
import { validateApiResponse, isArray } from "@/shared/lib/validation";

export const useGetPrograms = () => {
  return useQueryWithErrorHandling<Program[]>({
    queryKey: [QUERY_KEYS.PROGRAMS],
    queryFn: async () => {
      const response = await programApi.getPrograms();
      // Валидация ответа
      return validateApiResponse(
        response,
        (data): data is Program[] => isArray(data),
        'Invalid programs response format'
      );
    },
  });
};