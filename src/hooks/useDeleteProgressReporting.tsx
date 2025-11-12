import { useQueryClient } from '@tanstack/react-query';
import useDeletePrivateRoutes from './useDeletePrivateRoutes';

export default function useDeleteProgressReporting(id: string) {
  const queryClient = useQueryClient();
  const mutation = useDeletePrivateRoutes({
    endpoint: `/functions/v1/progress-report/${id}`,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['progressReportList']
      });
    }
  });

  return mutation;
}
