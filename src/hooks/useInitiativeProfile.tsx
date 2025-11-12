import { convertToClientEntity } from "@app/utils/InitiativeProfile";
import { useActiveInitiative } from "./useActiveInitiative";
import useGetPrivateRoutes from "./useGetPrivateRoutes";
import {
  isInitiativeProfileShape,
  type InitiativeProfileDTO,
  type InitiativeProfileFormData,
} from "@app/types";

export default function useInitiativeProfile() {
  const { activeInitiative } = useActiveInitiative();

  return useGetPrivateRoutes<InitiativeProfileFormData, InitiativeProfileDTO>({
    endpoint: `/functions/v1/initiative-profile/${activeInitiative?.id}`,
    queryKey: ["initiativeProfile", activeInitiative?.id],
    typeGuard: isInitiativeProfileShape,
    convertToClientEntity,
    enabled: !!activeInitiative?.id,
    staleTime: Infinity,
  });
}
