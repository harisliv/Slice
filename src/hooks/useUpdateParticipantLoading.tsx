import { useIsMutating } from '@tanstack/react-query';
import { useState } from 'react';

export const useUpdateParticipantLoading = () => {
  const [hasMutationOccurred, setHasMutationOccurred] = useState(false);

  const isMutating = useIsMutating({
    predicate: (mutation) => {
      if (
        mutation.options.mutationKey?.[0] === 'updateParticipant' ||
        mutation.options.mutationKey?.[0] === 'createAccountEntity'
      ) {
        setHasMutationOccurred(true);
        return true;
      }
      return false;
    }
  });

  return { isMutating: isMutating > 0, hasMutated: hasMutationOccurred };
};
