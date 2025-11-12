import {
  type ProgressReportingDTO,
  type TProgressReportingData
} from '@app/types';
import { convertToTableData } from '@app/utils/ProgressReporting';
import useGetPrivateRoutes from './useGetPrivateRoutes';
import { useActiveInitiative } from './useActiveInitiative';
import useInitiatives from './useInitiatives';

export function useProgressReporting({ enabled = true } = {}) {
  const { activeInitiative } = useActiveInitiative();

  useInitiatives({ enabled: !!activeInitiative?.id });

  return useGetPrivateRoutes<TProgressReportingData[], ProgressReportingDTO[]>({
    endpoint: `/functions/v1/progress-report/initiative/${activeInitiative?.id}`,
    queryKey: ['progressReportList', activeInitiative?.id],
    typeGuard: Array.isArray,
    convertToClientEntity: convertToTableData,
    enabled: enabled && !!activeInitiative?.id
  });
}
