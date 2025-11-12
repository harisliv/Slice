import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult
} from '@tanstack/react-query';
import type { AxiosRequestConfig } from 'axios';
import { apiClient } from '@app/config/axios.config';

interface useDeletePrivateRoutesOptions<T, Error>
  extends Omit<UseMutationOptions<T, Error, Partial<T>>, 'mutationFn'> {
  endpoint: string;
}

export default function useDeletePrivateRoutes<T = unknown>({
  endpoint,
  ...mutationOptions
}: useDeletePrivateRoutesOptions<T, Error>): UseMutationResult<
  T,
  Error,
  Partial<T>
> {
  return useMutation<T, Error, Partial<T>>({
    throwOnError: true,
    ...mutationOptions,
    mutationFn: async (body: Partial<T> = {}) => {
      const config: AxiosRequestConfig = {};

      if (body) {
        config.data = body;
      }

      const response = await apiClient.delete(endpoint, config);

      return response.data;
    }
  });
}
