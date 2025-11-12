import { useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import useMutatePrivateRoutes from "./useMutatePrivateRoutes";
import {
  type InitiativeProfileDTO,
  type InitiativeProfileFormData,
} from "@app/types";
import { convertToServerEntity } from "@app/utils/InitiativeProfile";
import { useActiveInitiative } from "./useActiveInitiative";
import { ToasterType, useToasterStore } from "./Toaster";
import axios from "axios";

export default function useMutateInitiativeProfile(): UseMutationResult<
  InitiativeProfileFormData,
  Error,
  InitiativeProfileFormData
> {
  const { activeInitiative } = useActiveInitiative();
  const showToaster = useToasterStore((state) => state.showToaster);

  const queryClient = useQueryClient();
  const mutation = useMutatePrivateRoutes<
    InitiativeProfileFormData,
    InitiativeProfileDTO
  >({
    endpoint: `/functions/v1/initiative-profile/${activeInitiative?.id}`,
    convertToServerEntity: convertToServerEntity,
    action: "put",
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["initiativeProfile"],
      });
      queryClient.invalidateQueries({
        queryKey: ["initiative-info"],
      });
      showToaster({
        message: "Your changes have been saved successfully.",
        toasterType: ToasterType.SUCCESS,
      });
    },
    onError: (error) => {
      const errorResponse = axios.isAxiosError(error)
        ? error.response?.data
        : error;
      showToaster({
        message: "An error occurred while saving your changes.",
        toasterType: ToasterType.ERROR,
        errorDetails: errorResponse,
      });
    },
  });

  return mutation;
}
