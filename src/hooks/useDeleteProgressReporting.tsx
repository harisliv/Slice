import { useQueryClient } from '@tanstack/react-query';
import useDeletePrivateRoutes from './useDeletePrivateRoutes';

export default function useDeleteProgressReporting(id: string) {
  const queryClient = useQueryClient();
  const mutation = useDeletePrivateRoutes({
    endpoint: `/progressReport/${id}`,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['progressReportList']
      });
    }
  });

  return mutation;
}
