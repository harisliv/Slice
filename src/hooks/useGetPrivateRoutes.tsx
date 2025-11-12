import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult
} from '@tanstack/react-query';
import type { AxiosRequestConfig } from 'axios';
import { apiClient } from '@app/config/axios.config';
import { logger } from '@app/utils';

interface UseGetPrivateRoutesOptions<T, DTO>
  extends Omit<UseQueryOptions<T>, 'queryFn'> {
  endpoint: string;
  typeGuard: (value: unknown) => value is T;
  convertToClientEntity?: (value: DTO) => T;
  onQueryFnSuccess?: (data: T) => void;
}

export default function useGetPrivateRoutes<T = unknown, DTO = unknown>({
  endpoint,
  typeGuard,
  onQueryFnSuccess,
  convertToClientEntity,
  ...queryOptions
}: UseGetPrivateRoutesOptions<T, DTO>): UseQueryResult<T, Error> {
  return useQuery<T>({
    ...queryOptions,
    queryFn: async () => {
      const config: AxiosRequestConfig = {};

      const response = await apiClient.get(endpoint, config);

      const data = convertToClientEntity
        ? convertToClientEntity(response.data)
        : response.data;

      if (!typeGuard(data)) {
        logger.error('Invalid response format', new Error(endpoint), data);
      }

      if (onQueryFnSuccess) {
        onQueryFnSuccess(data);
      }

      return data;
    },
    enabled: queryOptions.enabled ?? true
  });
}
