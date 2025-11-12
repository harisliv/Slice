import { useQueryClient } from '@tanstack/react-query';
import useDeletePrivateRoutes from './useDeletePrivateRoutes';
import { useActiveInitiative } from './useActiveInitiative';

export default function useDeleteParticipant(id: string) {
  const queryClient = useQueryClient();
  const { activeInitiative } = useActiveInitiative();
  return useDeletePrivateRoutes({
    endpoint: `/functions/v1/participant/${id}`,
    mutationKey: ['deleteParticipant'],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getMyParticipants', activeInitiative?.id]
      });
    }
  });
}
