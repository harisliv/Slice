import { useQueryClient } from "@tanstack/react-query";
import type {
  AccountEntityCreateDTO,
  AccountEntityDetails,
  AccountEntityOption,
  SCHEMA_TYPE,
  SmartDropdownData,
} from "@app/types";
import {
  convertToClientEntity,
  convertToServerEntity,
} from "@app/utils/smartDropdown";
import { idbAddItem } from "@app/utils/indexedDb";
import { IDB_STORES } from "@app/constants";
import useMutatePrivateRoutes from "./useMutatePrivateRoutes";
import { useActiveInitiative } from "./useActiveInitiative";
import { apiClient } from "@app/config/axios.config";

function isAccountEntityDetails(v: any): v is AccountEntityDetails {
  return !!v && typeof v.id === "string" && typeof v.name === "string";
}

export default function useCreateAccountEntity(schemaType: SCHEMA_TYPE) {
  const qc = useQueryClient();
  const { activeInitiative } = useActiveInitiative();

  const mutation = useMutatePrivateRoutes<
    Partial<AccountEntityDetails>,
    AccountEntityCreateDTO
  >({
    endpoint: "/functions/v1/account",
    mutationKey: ["createAccountEntity"],
    convertToServerEntity,
    convertToClientEntity,
    typeGuard: isAccountEntityDetails,
    onSuccess: async (data) => {
      if (!data.id || !data.name) {
        return;
      }
      const accountOption: AccountEntityOption = {
        id: data.id,
        name: data.name,
      };

      await idbAddItem(IDB_STORES.accountsStore, accountOption);

      qc.setQueryData(["accounts", "idb"], (old: any) => ({
        dropdownAccounts: [...(old?.dropdownAccounts ?? []), accountOption],
        lastUpdate: old?.lastUpdate,
      }));
    },
  });

  return {
    ...mutation,
    mutateAsync: async (data: SmartDropdownData) => {
      const initiativeId =
        schemaType === "participantCreation" && activeInitiative?.id
          ? activeInitiative.id
          : undefined;

      const dataToSubmit = initiativeId ? { ...data, initiativeId } : data;
      const createdAccount = await mutation.mutateAsync(dataToSubmit);

      // If initiativeId was provided, also create a participant entry
      if (initiativeId && createdAccount.id) {
        try {
          // Use the original data structure and add required participant fields
          const participantData = {
            ...data,
            // Ensure the ID matches the created account
            id: createdAccount.id,
            // Add required participant fields
            initiativeId,
            accountId: createdAccount.id,
            // Merge in any fields from createdAccount that might be missing
            ...createdAccount,
          };

          // Create participant entry
          await apiClient.post("/functions/v1/participant", participantData);

          // Invalidate participant list query to refresh the list
          qc.invalidateQueries({
            queryKey: ["getMyParticipants", initiativeId],
          });
        } catch (error) {
          console.error("Failed to create participant entry:", error);
          // Don't throw - account was created successfully, participant creation is secondary
        }
      }

      return createdAccount;
    },
  };
}
