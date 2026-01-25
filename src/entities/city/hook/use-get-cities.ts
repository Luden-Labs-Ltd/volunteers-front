import { cityApi } from '../api/city-api';
import { City } from '../model/types';
import { useQueryWithErrorHandling } from '@/shared/api/hook/use-query-with-error-handling';
import { QUERY_KEYS } from '@/shared/api/hook/query-keys';

export const useGetCities = () => {
  return useQueryWithErrorHandling<City[], Error>({
    queryKey: [QUERY_KEYS.CITIES],
    queryFn: () => cityApi.getCities(),
    staleTime: 10 * 60 * 1000, // 10 minutes - cities don't change often
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};
