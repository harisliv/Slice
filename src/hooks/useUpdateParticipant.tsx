import useMutatePrivateRoutes from "./useMutatePrivateRoutes";
import {
  isParticipantUpdateSchema,
  type AccountEntityCreateDTO,
  type ParticipantUpdateSchema,
} from "@app/types";
import { useActiveInitiative } from "./useActiveInitiative";

type TUpdateParticipantBody = ParticipantUpdateSchema & {
  initiativeId: string;
  accountId: string;
};

export function useUpdateParticipant() {
  const { activeInitiative } = useActiveInitiative();
  const mutation = useMutatePrivateRoutes<
    ParticipantUpdateSchema,
    AccountEntityCreateDTO,
    TUpdateParticipantBody
  >({
    endpoint: `/functions/v1/participant`,
    mutationKey: ["updateParticipant"],
    typeGuard: isParticipantUpdateSchema,
  });
  return {
    ...mutation,
    mutateAsync: async (data: ParticipantUpdateSchema) => {
      return mutation.mutateAsync({
        ...data,
        initiativeId: activeInitiative?.id || "",
        accountId: data.id,
      });
    },
  };
}
