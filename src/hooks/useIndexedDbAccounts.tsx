import { useMemo } from "react";
import {
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";
import useGetPrivateRoutes from "@app/hooks/useGetPrivateRoutes";
import { IDB_STORES, VERSION_KEYS } from "@app/constants";
import type { AccountEntityOption, DropdownAccountsDTO } from "@app/types";
import {
  convertToClientEntity,
  idbBootstrapList,
  idbPersistList,
} from "@app/utils/indexedDb";
import { isAccountEntityOptionArray } from "@app/utils/smartDropdown";
import dayjs from "dayjs";
import { isString } from "lodash";
import { formatDateTime, logger } from "@app/utils";

export default function useIndexedDbAccounts(isOpen: boolean): {
  options: AccountEntityOption[];
  isLoading: boolean;
} {
  const qc = useQueryClient();

  const idbQuery = useQuery({
    queryKey: ["accounts", "idb"],
    queryFn: async () =>
      idbBootstrapList<AccountEntityOption>(
        IDB_STORES.accountsStore,
        VERSION_KEYS.accounts
      ),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: isOpen,
  });

  // 2) Poll last-update
  const versionQuery = useGetPrivateRoutes({
    endpoint: "/dropdown/accounts/lastUpdate",
    queryKey: ["accounts", "version"],
    convertToClientEntity,
    typeGuard: isString,
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    enabled: isOpen,
  });

  const localVersion =
    idbQuery.data?.lastUpdate ?? dayjs().subtract(1, "day").toISOString();

  const remoteVersion = versionQuery.data;

  logger.info("localVersion", formatDateTime(localVersion));
  remoteVersion && logger.info("remoteVersion", formatDateTime(remoteVersion));

  const shouldFetch = useMemo(() => {
    if (!isOpen) return false;

    // If IndexedDB query hasn't completed yet, wait for it
    if (idbQuery.isLoading) return false;

    // If IndexedDB query failed or hasn't succeeded, fetch from server
    if (!idbQuery.isSuccess) return true;

    const hasLocalData =
      idbQuery.data?.dropdownAccounts &&
      idbQuery.data.dropdownAccounts.length > 0;

    if (!hasLocalData) {
      return true;
    }

    if (remoteVersion && localVersion) {
      return dayjs(remoteVersion).isAfter(dayjs(localVersion));
    }

    return false;
  }, [
    idbQuery.isSuccess,
    idbQuery.isLoading,
    idbQuery.data?.dropdownAccounts,
    remoteVersion,
    localVersion,
    isOpen,
  ]);

  const optionsQuery: UseQueryResult<AccountEntityOption[], Error> =
    useGetPrivateRoutes<AccountEntityOption[], DropdownAccountsDTO[]>({
      endpoint: "/dropdown/accounts",
      queryKey: ["accounts", "accountsList"],
      convertToClientEntity: (v) => (Array.isArray(v) ? v : []),
      typeGuard: isAccountEntityOptionArray,
      enabled: shouldFetch,
      placeholderData: idbQuery.data?.dropdownAccounts ?? [],
      onQueryFnSuccess: async (fresh) => {
        const version = new Date().toISOString();
        await idbPersistList<AccountEntityOption>(
          IDB_STORES.accountsStore,
          VERSION_KEYS.accounts,
          fresh,
          version
        );
        qc.setQueryData(["accounts", "idb"], {
          dropdownAccounts: fresh,
          lastUpdate: version,
        });
      },
    });

  const options = optionsQuery.data ?? idbQuery.data?.dropdownAccounts ?? [];
  const isLoading = !!optionsQuery.isFetching || idbQuery.isFetching;

  return { options, isLoading };
}
