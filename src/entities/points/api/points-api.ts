import { apiClient } from '@/shared/api';
import {
  PointsBalance,
  PointsTransactionsResponse,
} from '../model/types';
import { validateApiResponse, isObject, isNumber, isArray } from '@/shared/lib/validation';

export const pointsApi = {
  getBalance: async (): Promise<number> => {
    const response = await apiClient.request<PointsBalance>('/points/balance');
    return validateApiResponse(
      response,
      (data): data is PointsBalance =>
        isObject(data) && isNumber(data.balance),
      'Invalid points balance response format'
    ).balance;
  },

  getTransactions: async (limit?: number, offset?: number): Promise<PointsTransactionsResponse> => {
    const queryParams = new URLSearchParams();
    if (limit !== undefined) queryParams.append('limit', limit.toString());
    if (offset !== undefined) queryParams.append('offset', offset.toString());
    
    const queryString = queryParams.toString();
    const response = await apiClient.request<PointsTransactionsResponse>(
      `/points/transactions${queryString ? `?${queryString}` : ''}`
    );
    
    return validateApiResponse(
      response,
      (data): data is PointsTransactionsResponse =>
        isObject(data) &&
        isArray(data.transactions) &&
        isNumber(data.total),
      'Invalid points transactions response format'
    );
  },
};
