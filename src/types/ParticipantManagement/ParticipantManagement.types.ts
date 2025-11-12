import { z } from "zod";
import { MyParticipantsSchema } from "./MyParticipants.types";

export const ParticipantManagementFormDataSchema = z.array(
  z.object({
    ...MyParticipantsSchema.shape,
    accountId: z.string(),
  }),
);

export type ParticipantManagementDTO = {
  id: string;
  country: string | null;
  type: string | null;
  category: string | null;
  entityOperatingName: string | null;
  pledge: boolean;
  legalName: string | null;
  identityType: string | null;
  identityNumber: string | null;
  businessActivity: string | null;
  subnationalGovernmentType: string | null;
  subnationalGovernmentTypeOther: string | null;
  participantFocalPoint: string | null;
  participantEmail: string | null;
  gcapId: string | null;
  dateJoined: string | null;
  accountId: string;
}[];

export type ParticipantManagementFormData = z.infer<
  typeof ParticipantManagementFormDataSchema
>;
