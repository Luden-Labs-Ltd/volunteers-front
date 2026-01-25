import { cityApi } from '../api/city-api';
import type { CityLeaderboardStats } from '../api/city-api';
import { useQueryWithErrorHandling } from '@/shared/api/hook/use-query-with-error-handling';
import { QUERY_KEYS } from '@/shared/api/hook/query-keys';

export const useGetLeaderboard = (limit?: number) => {
  return useQueryWithErrorHandling<CityLeaderboardStats[], Error>({
    queryKey: [QUERY_KEYS.CITIES, 'leaderboard', limit],
    queryFn: () => cityApi.getLeaderboard(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes - leaderboard updates frequently
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
};
