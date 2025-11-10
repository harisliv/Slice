import useGetPrivateRoutes from '@app/hooks/useGetPrivateRoutes';
import type { AccountEntityCreateDTO, AccountEntityDetails } from '@app/types';
import {
  convertToClientEntity,
  isAccountEntityDetails
} from '@app/utils/smartDropdown';

export default function useGetAccountEntity(
  id: string,
  onQueryFnSuccess: (data: AccountEntityDetails) => void
) {
  return useGetPrivateRoutes<AccountEntityDetails, AccountEntityCreateDTO>({
    endpoint: `/account/${id}`,
    queryKey: ['entityDetails', id],
    enabled: !!id && id.trim().length > 0,
    typeGuard: isAccountEntityDetails,
    convertToClientEntity,
    onQueryFnSuccess
  });
}
