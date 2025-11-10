import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { useActiveInitiative } from './useActiveInitiative';
import useInitiatives from './useInitiatives';

export const useParticipantLoading = () => {
  const { activeInitiative } = useActiveInitiative();

  useInitiatives({
    enabled: !activeInitiative?.id
  });

  const isFetching = useIsFetching({
    predicate: (query) => {
      if (query.options.queryKey?.includes('getMyParticipants')) return true;
      return false;
    }
  });

  const isMutating = useIsMutating({
    predicate: (mutation) => {
      if (mutation.options.mutationKey?.[0] === 'deleteParticipant')
        return true;
      return false;
    }
  });

  return isFetching > 0 || isMutating > 0 || !activeInitiative;
};
