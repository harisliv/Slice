import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult
} from '@tanstack/react-query';
import type { AxiosRequestConfig } from 'axios';
import { apiClient } from '@app/config/axios.config';

interface useMutatePrivateRoutesOptions<T, Error, DTO = unknown>
  extends Omit<UseMutationOptions<T, Error, T>, 'mutationFn'> {
  endpoint: string;
  typeGuard?: (value: unknown) => value is T;
  action?: 'post' | 'put' | 'patch';
  convertToClientEntity?: (value: DTO) => T;
  convertToServerEntity?: (value: T) => DTO;
  onMutationFnSuccess?: (value: DTO) => void;
}

export default function useMutatePrivateRoutes<
  T = unknown,
  DTO = unknown,
  K extends T = T
>({
  endpoint,
  typeGuard,
  action = 'post',
  convertToClientEntity,
  convertToServerEntity,
  onMutationFnSuccess,
  ...mutationOptions
}: useMutatePrivateRoutesOptions<T, Error, DTO>): UseMutationResult<
  T,
  Error,
  K
> {
  return useMutation<T, Error, K>({
    ...mutationOptions,
    mutationFn: async (body: T) => {
      const config: AxiosRequestConfig = {};

      const serverData = convertToServerEntity
        ? convertToServerEntity(body)
        : body;

      const response = await apiClient[action](endpoint, serverData, config);

      const formEntity = convertToClientEntity
        ? convertToClientEntity(response.data)
        : response.data;

      if (typeGuard && !typeGuard(formEntity)) {
        console.error(`Invalid response format`, formEntity);
      }

      onMutationFnSuccess?.(formEntity); // TODO formEntity this is useless, remove

      return formEntity;
    }
  });
}
