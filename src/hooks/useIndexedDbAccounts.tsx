import type { UseQueryResult } from '@tanstack/react-query';
import useGetPrivateRoutes from '@app/hooks/useGetPrivateRoutes';
import type { AccountEntityOption, DropdownAccountsDTO } from '@app/types';
import { isAccountEntityOptionArray } from '@app/utils/smartDropdown';

export default function useIndexedDbAccounts(isOpen: boolean): {
  options: AccountEntityOption[];
  isLoading: boolean;
} {
  const optionsQuery: UseQueryResult<AccountEntityOption[], Error> =
    useGetPrivateRoutes<AccountEntityOption[], DropdownAccountsDTO[]>({
      endpoint: '/functions/v1/dropdown-accounts',
      queryKey: ['accounts', 'accountsList'],
      convertToClientEntity: (v) => (Array.isArray(v) ? v : []),
      typeGuard: isAccountEntityOptionArray,
      enabled: isOpen
    });

  const options = optionsQuery.data ?? [];
  const isLoading = optionsQuery.isFetching || optionsQuery.isLoading;

  return { options, isLoading };
}
