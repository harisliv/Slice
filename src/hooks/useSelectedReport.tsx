import {
  isProgressReportingShape,
  type TProgressReportingShape
} from '@app/types';
import { convertToClientEntity } from '@app/utils/ProgressReporting';
import useGetPrivateRoutes from './useGetPrivateRoutes';
import type { UseQueryResult } from '@tanstack/react-query';

export function useSelectedReport({
  id
}: {
  id: string;
  enabled?: boolean;
}): UseQueryResult<TProgressReportingShape, Error> {
  return useGetPrivateRoutes({
    endpoint: `/progressReport/${id}`,
    queryKey: ['singleReport', id],
    typeGuard: isProgressReportingShape,
    convertToClientEntity,
    enabled: !!id
  });
}
