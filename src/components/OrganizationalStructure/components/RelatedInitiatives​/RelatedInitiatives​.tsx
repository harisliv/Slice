import { Divider, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { PlusIcon } from "@app/lib/icons";
import { ButtonComponent } from "@app/lib/ui";
import FormInputDescription from "@app/components/FormInputDescription";
import { ORGANIZATIONAL_STRUCTURE_FIELD_INFO } from "@app/constants";
import { AddInitiativeModal } from "./components";
import { useRelatedInitiatives, useValidationDecisionModal } from "@app/hooks";
import { GenericTable } from "@app/components";

import {
  usePendingInitiativesEditModecolumns,
  useRelatedInitiativesEditModeColumns,
} from "../../hooks";
import { useState } from "react";
import type { TempModalPayload } from "@app/types";

export default function RelatedInitiatives() {
  const {
    manualInitiatives,
    relationshipInitiatives,
    removeManualInitiative,
    addManualInitiative,
    mergeUpdatedValidations,
    relatedInitiatives,
    resetTempoOptionFields,
    resetTempValidationsFields,
    tempValidations,
    isValidTempModalPayload,
  } = useRelatedInitiatives();

  const addManualInitiativeAndCloseModal = (tempOption: TempModalPayload) => {
    addManualInitiative(tempOption);
    setAddModalOpen(false);
    resetTempoOptionFields();
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
    resetTempoOptionFields();
  };

  const [addModalOpen, setAddModalOpen] = useState(false);

  const { showValidationDecisionModal } = useValidationDecisionModal({
    onConfirm: () => {
      mergeUpdatedValidations();
      resetTempValidationsFields();
    },
  });

  const relatedInitiativesColumns = useRelatedInitiativesEditModeColumns({
    removeRow: removeManualInitiative,
  });

  const pendingInitiativesColumns = usePendingInitiativesEditModecolumns();

  return (
    <Stack spacing={3}>
      <FormInputDescription
        title={ORGANIZATIONAL_STRUCTURE_FIELD_INFO.relatedInitiatives.title}
        subtitle={
          ORGANIZATIONAL_STRUCTURE_FIELD_INFO.relatedInitiatives.subtitle
        }
      />

      <ButtonComponent
        customVariant="primary-m"
        startIcon={<PlusIcon />}
        onClick={() => setAddModalOpen(true)}
      >
        Add initiative
      </ButtonComponent>

      {manualInitiatives && manualInitiatives.length > 0 && (
        <GenericTable
          columns={relatedInitiativesColumns}
          data={manualInitiatives}
        />
      )}

      <Divider />

      <FormInputDescription
        title={
          ORGANIZATIONAL_STRUCTURE_FIELD_INFO.relatedInitiativesPending.title
        }
        subtitle={
          ORGANIZATIONAL_STRUCTURE_FIELD_INFO.relatedInitiativesPending.subtitle
        }
      />

      {relationshipInitiatives && relationshipInitiatives.length > 0 && (
        <Stack spacing={2}>
          <Grid container justifyContent="flex-end" gap={1}>
            <GenericTable
              columns={pendingInitiativesColumns}
              data={relationshipInitiatives}
            />

            <ButtonComponent
              customVariant="secondary-m"
              disabled={
                !tempValidations || Object.keys(tempValidations).length === 0
              }
              onClick={showValidationDecisionModal}
              sx={{
                padding: "6px 17.5px !important",
              }}
            >
              Confirm
            </ButtonComponent>
          </Grid>
        </Stack>
      )}

      <AddInitiativeModal
        open={addModalOpen}
        onClose={closeAddModal}
        onConfirm={addManualInitiativeAndCloseModal}
        relativeInitiatives={relatedInitiatives}
        disabled={!isValidTempModalPayload()}
        onClear={resetTempoOptionFields}
      />
    </Stack>
  );
}
