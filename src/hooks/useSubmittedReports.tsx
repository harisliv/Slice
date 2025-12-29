import { useActiveInitiative } from './useActiveInitiative';
import useInitiatives from './useInitiatives';
import { useProgressReporting } from './useProgressReporting';
import { TagStatus } from '@app/lib/types';

export function useSubmittedReports(enabled: boolean = true) {
  const { activeInitiative } = useActiveInitiative();

  useInitiatives({ enabled: !!activeInitiative?.id });

  const { data, ...rest } = useProgressReporting({ enabled });

  const submittedReports = data?.filter(
    (report) => report.reportingStatus === TagStatus.SUBMITTED
  );

  const allProgressReportsDateRanges = submittedReports
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
