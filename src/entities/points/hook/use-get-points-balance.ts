import { useQueryWithErrorHandling } from '@/shared/api/hook/use-query-with-error-handling';
import { pointsApi } from '../api/points-api';
import { QUERY_KEYS } from '@/shared/api/hook/query-keys';

export function useGetPointsBalance() {
  return useQueryWithErrorHandling<number, Error>({
    queryKey: [QUERY_KEYS.POINTS_BALANCE],
    queryFn: () => pointsApi.getBalance(),
    staleTime: 30 * 1000, // 30 seconds
  });
}
