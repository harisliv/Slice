import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { useActiveInitiative } from './useActiveInitiative';
import useInitiatives from './useInitiatives';

export const useSingleReportLoading = () => {
  const { activeInitiative } = useActiveInitiative();

  useInitiatives({
    enabled: !activeInitiative?.id
  });

  const isFetching = useIsFetching({
    predicate: (query) => {
      if (query.options.queryKey?.includes('singleReport')) return true;
      if (query.options.queryKey?.includes('submittedReports')) return true;
      return false;
    }
  });

  const isMutating = useIsMutating({
    predicate: (mutation) => {
      if (mutation.options.mutationKey?.[0] === 'createReport') return true;
      return false;
    }
  });

  return isFetching > 0 || isMutating > 0 || !activeInitiative;
};
