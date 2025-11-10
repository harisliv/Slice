import { useQueryClient } from '@tanstack/react-query';
import type {
  AccountEntityCreateDTO,
  AccountEntityDetails,
  AccountEntityOption,
  SCHEMA_TYPE,
  SmartDropdownData
} from '@app/types';
import {
  convertToClientEntity,
  convertToServerEntity
} from '@app/utils/smartDropdown';
import { idbAddItem } from '@app/utils/indexedDb';
import { IDB_STORES } from '@app/constants';
import useMutatePrivateRoutes from './useMutatePrivateRoutes';
import { useActiveInitiative } from './useActiveInitiative';

function isAccountEntityDetails(v: any): v is AccountEntityDetails {
  return !!v && typeof v.id === 'string' && typeof v.name === 'string';
}

export default function useCreateAccountEntity(schemaType: SCHEMA_TYPE) {
  const qc = useQueryClient();
  const { activeInitiative } = useActiveInitiative();

  const mutation = useMutatePrivateRoutes<
    Partial<AccountEntityDetails>,
    AccountEntityCreateDTO
  >({
    endpoint: '/account',
    mutationKey: ['createAccountEntity'],
    convertToServerEntity,
    convertToClientEntity,
    typeGuard: isAccountEntityDetails,
    onSuccess: async (data) => {
      if (!data.id || !data.name) {
        return;
      }
      const accountOption: AccountEntityOption = {
        id: data.id,
        name: data.name
      };

      await idbAddItem(IDB_STORES.accountsStore, accountOption);

      qc.setQueryData(['accounts', 'idb'], (old: any) => ({
        dropdownAccounts: [...(old?.dropdownAccounts ?? []), accountOption],
        lastUpdate: old?.lastUpdate
      }));
    }
  });

  return {
    ...mutation,
    mutateAsync: async (data: SmartDropdownData) => {
      const dataToSubmit =
        schemaType === 'participantCreation' && activeInitiative?.id
          ? { ...data, initiativeId: activeInitiative.id }
          : data;
      return mutation.mutateAsync(dataToSubmit);
    }
  };
}
