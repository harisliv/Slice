import {
  validationStatusSchema,
  type OrganizationalStructureFormData,
  type RelatedInitiative,
  type TempModalPayload,
} from "@app/types";
import {
  filterManualRelatedInitiatives,
  filterRelationshipRelatedInitiatives,
} from "@app/utils/InitiativeProfile";
import { useMemo } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

const getUserContactInfo = () => {
  // No authentication - return empty/default values
  return {
    fullName: "",
    email: "",
  };
};

export function useRelatedInitiatives() {
  const { control, resetField, getValues, setValue } =
    useFormContext<OrganizationalStructureFormData>();

  const methods = useFieldArray({ control, name: "relatedInitiatives" });

  const relatedInitiatives = useWatch({ control, name: "relatedInitiatives" });

  const tempValidations = useWatch({ control, name: "tempValidations" });

  const resetTempoOptionFields = () => {
    resetField("tempOption", { defaultValue: { id: "", name: "" } });
    resetField("tempRelationshipType", { defaultValue: "" });
  };

  const resetTempValidationsFields = () => {
    setValue("tempValidations", {});
  };

  const memoizedManualInitiatives = useMemo(() => {
    if (!relatedInitiatives) return [];

    return filterManualRelatedInitiatives(relatedInitiatives);
  }, [relatedInitiatives]);

  const memoizedRelationshipInitiatives = useMemo(() => {
    if (!relatedInitiatives) return [];

    return filterRelationshipRelatedInitiatives(relatedInitiatives);
  }, [relatedInitiatives]);

  const { append, remove, update } = methods;

  const removeManualInitiative = (id: string) => {
    const indexToRemove = memoizedManualInitiatives?.findIndex(
      (i) => i.id === id,
    );

    if (indexToRemove === -1) {
      return;
    }

    remove(indexToRemove);
  };

  const addManualInitiative = (tempOption: TempModalPayload) => {
    if (
      !tempOption ||
      getValues("relatedInitiatives")?.some(
        (i) => i.relatedInitiativeId === tempOption.id,
      )
    )
      return;
    const { fullName, email } = getUserContactInfo();

    const payload: RelatedInitiative = {
      id: null,
      relatedInitiativeName: tempOption.name ?? "",
      relatedInitiativeId: tempOption.id ?? "",
      relationshipType: tempOption.relationshipType,
      contactName: fullName,
      contactEmail: email,
      validationStatus: validationStatusSchema.Enum.Pending,
      needsConfirmation: false,
    };
    append(payload);
  };

  const mergeUpdatedValidations = () => {
    const currentRelatedInitiatives = getValues("relatedInitiatives");
    if (!tempValidations || !currentRelatedInitiatives) return;

    const indexesToRemove: number[] = [];

    memoizedRelationshipInitiatives?.forEach(
      (initiative: RelatedInitiative) => {
        const initiativeId = initiative.relatedInitiativeId;
        if (initiativeId && tempValidations[initiativeId]) {
          const decision = tempValidations[initiativeId];

          const actualIndex = currentRelatedInitiatives.findIndex(
            (item) => item.id === initiative.id,
          );

          if (actualIndex === -1) return;

          if (decision === validationStatusSchema.Enum.No) {
            indexesToRemove.push(actualIndex);
          } else if (decision === validationStatusSchema.Enum.Yes) {
            const updatedInitiative: RelatedInitiative = {
              ...initiative,
              validationStatus: decision,
              needsConfirmation: false,
            };
            update(actualIndex, updatedInitiative);
          }
        }
      },
    );
    indexesToRemove.reverse().forEach((index) => remove(index));
  };

  const isValidTempModalPayload = () => {
    const tempOption = getValues("tempOption");
    const tempRelationshipType = getValues("tempRelationshipType");
    return (
      tempOption && tempOption?.id && tempOption?.name && tempRelationshipType
    );
  };

  return {
    relatedInitiatives,
    manualInitiatives: memoizedManualInitiatives,
    relationshipInitiatives: memoizedRelationshipInitiatives,
    removeManualInitiative,
    addManualInitiative,
    mergeUpdatedValidations,
    resetTempoOptionFields,
    resetTempValidationsFields,
    tempValidations,
    isValidTempModalPayload,
  };
}
