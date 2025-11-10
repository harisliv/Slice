import { logger } from '@app/utils';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      throwOnError: true,
      retry: 3
    },
    mutations: {
      throwOnError: false
    }
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      logger.error(`Query Client Error: ${query.queryKey}`, error);
    },
    onSuccess: (data, query) => {
      logger.info(`Query Client Response: ${query.queryKey}`, data);
    }
  }),
  mutationCache: new MutationCache({
    onError: (error, variables) => {
      logger.error(`Mutation Client Error: ${variables}`, error);
    },
    onSuccess: (data, variables) => {
      logger.info(`Mutation Client Response: ${variables}`, data);
    }
  })
});
