import {
  type ProgressReportingDTO,
  type TProgressReportingData
} from '@app/types';
import { convertToTableData } from '@app/utils/ProgressReporting';
import useGetPrivateRoutes from './useGetPrivateRoutes';
import { useActiveInitiative } from './useActiveInitiative';
import useInitiatives from './useInitiatives';

export function useSubmittedReports(enabled: boolean = true) {
  const { activeInitiative } = useActiveInitiative();

  useInitiatives({ enabled: !!activeInitiative?.id });

  let endpointUrl = `/progressReport/initiative/${activeInitiative?.id}?status=Submitted`;

  const { data, ...rest } = useGetPrivateRoutes<
    TProgressReportingData[],
    ProgressReportingDTO[]
  >({
    endpoint: endpointUrl,
    queryKey: ['submittedReports', activeInitiative?.id],
    typeGuard: Array.isArray,
    convertToClientEntity: convertToTableData,
    enabled: !!activeInitiative?.id && enabled
  });

  const allProgressReportsDateRanges = data
    ?.map((report) => [
      report?.timeframeOfInformation?.split(' to ')?.[0],
      report?.timeframeOfInformation?.split(' to ')?.[1]
    ])
    .filter(
      (i): i is [string, string] =>
        typeof i?.[0] === 'string' &&
        typeof i?.[1] === 'string' &&
        !i[0].includes('Invalid Date') &&
        !i[1].includes('Invalid Date')
    );

  return {
    ...rest,
    data,
    allProgressReportsDateRanges
  };
}
