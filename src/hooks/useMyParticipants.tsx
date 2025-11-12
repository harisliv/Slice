import {
  convertToTableEntity,
  isParticipantManagementFormData,
} from "@app/utils/MyParticipants";
import useGetPrivateRoute from "./useGetPrivateRoutes";
import type {
  ParticipantManagementDTO,
  ParticipantManagementFormData,
} from "@app/types";
import { useActiveInitiative } from "./useActiveInitiative";
import type { Option } from "@app/lib/types";
import { useMemo } from "react";

export default function useMyParticipants() {
  const { activeInitiative } = useActiveInitiative();
  const queryResult = useGetPrivateRoute<
    ParticipantManagementFormData,
    ParticipantManagementDTO
  >({
    endpoint: `/functions/v1/participant/initiative/${activeInitiative?.id}`,
    queryKey: ["getMyParticipants", activeInitiative?.id],
    typeGuard: isParticipantManagementFormData,
    convertToClientEntity: convertToTableEntity,
  });

  const selectOptions: Option[] = useMemo(() => {
    if (!queryResult.data) return [];

    return queryResult.data.map((participant) => ({
      label:
        participant.entityOperatingName || participant.legalName || "Unknown",
      value: participant.accountId,
    }));
  }, [queryResult.data]);

  return {
    ...queryResult,
    selectOptions,
  };
}
