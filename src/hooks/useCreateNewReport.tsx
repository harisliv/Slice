import { useNavigate } from 'react-router';
import useMutatePrivateRoutes from './useMutatePrivateRoutes';
import { type ProgressReportingDTO } from '@app/types';
import { useActiveInitiative } from './useActiveInitiative';
import { useSubmittedReports } from '@app/hooks';
import { findFirstAvailableSlot } from '@app/utils/ProgressReporting';
import dayjs from 'dayjs';
import { useQueryClient } from '@tanstack/react-query';

type TCreateNewReportShape = {
  reportStatus: 'Draft';
  typesOfChallengesFaced: [];
  actions: [];
  targets: [];
  initiativeId: string;
  reportingStartDate: string;
  reportingEndDate: string;
  submissionOrDraftDate: string;
};

export default function useCreateNewReport() {
  const { activeInitiative } = useActiveInitiative();
  const { allProgressReportsDateRanges = [] } = useSubmittedReports();
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const mutation = useMutatePrivateRoutes<
    TCreateNewReportShape,
    ProgressReportingDTO
  >({
    endpoint: `/progressReport`,
    action: 'post',
    onMutationFnSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['progressReportList', activeInitiative?.id]
      });
      navigate(`/assignment-management/create-assignment/${data.id}`); //TODO NAVIGATION GLITCH FIX
    }
  });

  return {
    ...mutation,
    mutateAsync: async () => {
      const startDate = findFirstAvailableSlot(allProgressReportsDateRanges);
      const endDate = dayjs(startDate)
        .add(1, 'year')
        .subtract(1, 'day')
        .toISOString();

      return mutation.mutateAsync({
        reportStatus: 'Draft',
        typesOfChallengesFaced: [],
        actions: [],
        targets: [],
        initiativeId: activeInitiative?.id || '',
        reportingStartDate: startDate,
        reportingEndDate: endDate,
        submissionOrDraftDate: new Date().toISOString()
      });
    }
  };
}
