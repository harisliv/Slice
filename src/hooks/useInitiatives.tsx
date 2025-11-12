import {
  isInitiativeInfo,
  type InitiativeInfo,
} from "@app/types/Initiative.types";
import useGetPrivateRoutes from "./useGetPrivateRoutes";
import type { UseQueryResult } from "@tanstack/react-query";
import { useActiveInitiative } from "./useActiveInitiative";
import { isEmpty } from "lodash";

export default function useInitiatives({ enabled = true } = {}): UseQueryResult<
  InitiativeInfo[],
  Error
> {
  const { setActiveInitiative } = useActiveInitiative();
  return useGetPrivateRoutes({
    endpoint: "/functions/v1/initiative",
    queryKey: ["initiative-info"],
    typeGuard: isInitiativeInfo,
    onQueryFnSuccess: (data) => {
      const initiativeIdInLocalStorage = localStorage.getItem("initiativeId");
      const foundInitiative = data.find(
        (initiative) => initiative.id === initiativeIdInLocalStorage,
      );
      if (!isEmpty(foundInitiative)) {
        setActiveInitiative(foundInitiative);
      } else {
        localStorage.setItem("initiativeId", data[0]?.id);
        setActiveInitiative(data[0]);
      }
    },
    enabled,
    staleTime: Infinity,
  });
}
