import type { UseMutationResult } from "@tanstack/react-query";
import useMutatePrivateRoutes from "./useMutatePrivateRoutes";
import { type InitiativeProfileDTO, type TargetFormData } from "@app/types";
import { useActiveInitiative } from "./useActiveInitiative";
import { normalizeNumber, normalizeString } from "@app/utils";

type TargetDTO = {
  initiativeId: string;
  targets: InitiativeProfileDTO["targets"];
};
type TargetFormEntity = TargetFormData["targets"];

const convertToServerEntity = (
  value: TargetFormEntity,
  initiativeId: string,
): TargetDTO => ({
  initiativeId,
  targets: value.map((target) => ({
    title: normalizeString(target.title),
    description: normalizeString(target.description),
    status: normalizeString(target.status),
    baseYear: normalizeNumber(target.baseyear),
    year: normalizeNumber(target.year),
    types: target.type,
    customType: normalizeString(target.typeDescription),
    unit: normalizeString(target.unit),
    value: normalizeNumber(target.value),
    updateTarget: target.updateTarget,
    targetProgess: target.targetProgress,
    statusReason: target.statusReason,
  })),
});

export default function useMutateTargets(): UseMutationResult<
  TargetFormEntity,
  Error,
  TargetFormEntity
> {
  const { activeInitiative } = useActiveInitiative();
  const mutation = useMutatePrivateRoutes<TargetFormEntity, TargetDTO>({
    endpoint: `/target`,
    convertToServerEntity: (value) =>
      convertToServerEntity(value, activeInitiative?.id || ""),
  });

  return mutation;
}
