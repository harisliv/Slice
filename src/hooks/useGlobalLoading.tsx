import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { useActiveInitiative } from './useActiveInitiative';
import useInitiatives from './useInitiatives';

export const useGlobalLoading = () => {
  const { activeInitiative } = useActiveInitiative();

  useInitiatives({
    enabled: !activeInitiative?.id
  });

  const isFetching = useIsFetching({
    predicate: (query) => {
      if (query.options.queryKey?.includes('entityDetails')) return false;
      if (query.options.queryKey?.includes('accounts')) return false;
      if (query.options.queryKey?.includes('dropdown')) return false;
      if (query.options.queryKey?.includes('singleReport')) return false;
      if (query.options.queryKey?.includes('acquireToken')) return false;
      return true;
    }
  });
  const isMutating = useIsMutating({
    predicate: (mutation) => {
      if (mutation.options.mutationKey?.[0] === 'uploadFile') return false;
      if (mutation.options.mutationKey?.[0] === 'createAccountEntity')
        return false;
      return true;
    }
  });

  return isFetching > 0 || isMutating > 0 || !activeInitiative;
};
