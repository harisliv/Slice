import {
  ParticipantManagementFormDataSchema,
  type ParticipantManagementDTO,
  type ParticipantManagementFormData,
  type SmartDropdownData,
} from "@app/types";
import { normalizeString } from "./general";

export const isParticipantManagementFormData = (
  value: unknown,
): value is ParticipantManagementFormData =>
  ParticipantManagementFormDataSchema.safeParse(value).success;

export const convertToTableEntity = (
  value: ParticipantManagementDTO,
): ParticipantManagementFormData =>
  value.map((participant) => ({
    id: participant.id,
    country: normalizeString(participant.country),
    type: normalizeString(participant.type),
    category: normalizeString(participant.category),
    entityOperatingName: normalizeString(participant.entityOperatingName),
    pledge: participant.pledge ? "Yes" : "No",
    legalName: normalizeString(participant.legalName),
    identityType: normalizeString(participant.identityType),
    identityNumber: normalizeString(participant.identityNumber),
    businessActivity: normalizeString(participant.businessActivity),
    subnationalGovernment: normalizeString(
      participant.subnationalGovernmentType,
    ),
    subnationalGovernmentOther: normalizeString(
      participant.subnationalGovernmentTypeOther,
    ),
    participantFocalPoint: normalizeString(participant.participantFocalPoint),
    participantEmail: normalizeString(participant.participantEmail),
    gcapId: normalizeString(participant.gcapId),
    dateJoined: normalizeString(participant.dateJoined),
    accountId: participant.accountId,
  })) || [];

export const convertSmartDropdownDataToTableEntity = (
  participant: SmartDropdownData,
): ParticipantManagementFormData[number] => ({
  id: participant.id,
  country: normalizeString(participant.country),
  type: normalizeString(participant.type),
  category:
    "category" in participant ? normalizeString(participant.category) : "",
  entityOperatingName: normalizeString(participant.name),
  pledge: "No",
  legalName: normalizeString(participant.legalName),
  identityType: normalizeString(participant.identityType),
  identityNumber: normalizeString(participant.identityNumber),
  businessActivity: normalizeString(participant.businessActivity),
  subnationalGovernment: normalizeString(participant.subnationalGovernmentType),
  subnationalGovernmentOther: normalizeString(
    participant.subnationalGovernmentTypeOther,
  ),
  participantFocalPoint: "",
  participantEmail: "",
  gcapId: "",
  dateJoined:
    "dateJoined" in participant ? normalizeString(participant.dateJoined) : "",
  accountId: participant.id,
});
