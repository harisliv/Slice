import { useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import useMutatePrivateRoutes from "./useMutatePrivateRoutes";
import {
  type ProgressReportingDTO,
  type TProgressReportingShape,
} from "@app/types";
import { convertToServerEntity } from "@app/utils/ProgressReporting";
import { useActiveInitiative } from "./useActiveInitiative";
import { ToasterType, useToasterStore } from "./Toaster";
import axios from "axios";

export default function useMutateProgressReporting(
  id: string,
): UseMutationResult<TProgressReportingShape, Error, TProgressReportingShape> {
  const showToaster = useToasterStore((state) => state.showToaster);

  const queryClient = useQueryClient();
  const { activeInitiative } = useActiveInitiative();
  const mutation = useMutatePrivateRoutes<
    TProgressReportingShape,
    ProgressReportingDTO
  >({
    endpoint: `/functions/v1/progress-report/${id}`,
    mutationKey: ["createReport"],
    convertToServerEntity,
    action: "put",
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["singleReport", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["progressReportList", activeInitiative?.id],
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

  return {
    ...mutation,
    mutateAsync: async (data: TProgressReportingShape) => {
      const payload = {
        ...data,
        initiativeId: activeInitiative?.id,
      };
      const result = await mutation.mutateAsync(payload);
      return result;
    },
  };
}
