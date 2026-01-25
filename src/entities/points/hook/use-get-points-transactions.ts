import { useQueryWithErrorHandling } from '@/shared/api/hook/use-query-with-error-handling';
import { pointsApi } from '../api/points-api';
import { PointsTransactionsResponse } from '../model/types';
import { QUERY_KEYS } from '@/shared/api/hook/query-keys';

export function useGetPointsTransactions(limit?: number, offset?: number) {
  return useQueryWithErrorHandling<PointsTransactionsResponse, Error>({
    queryKey: [QUERY_KEYS.POINTS_TRANSACTIONS, limit, offset],
    queryFn: () => pointsApi.getTransactions(limit, offset),
    staleTime: 60 * 1000, // 1 minute
  });
}
