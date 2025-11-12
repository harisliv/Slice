import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Grid2, Stack } from "@mui/material";
import { FormInputDescription } from "@app/components";
import { ButtonComponent, Paragraph, RemovableItem } from "@app/lib/ui";
import { PlusIcon } from "@app/lib/icons";
import { Theme } from "@app/lib/general";
import AddProgressReportModal from "./AddProgressReportModal";
import {
  defaultMonitoringFormValues,
  type GoalsTargetsAndMonitoringShape,
} from "@app/types";
import { useDeleteModal } from "@app/hooks";

export function PeriodicalProgressReport() {
  const { showDeleteModal } = useDeleteModal();
  const { control, watch } = useFormContext<GoalsTargetsAndMonitoringShape>();
  const { append, remove } = useFieldArray({
    control,
    name: "periodicalProgressReport",
  });

  const report = watch("periodicalProgressReport");
  const isReportSelected = watch("publicReportingOptions.checkbox2");

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const appendReport = () => {
    append(defaultMonitoringFormValues.periodicalProgressReport[0]);
    setIsReportModalOpen(true);
  };

  const openRemoveModal = (index: number) => {
    const title = report?.[index].title || "this report";
    showDeleteModal({
      subtitle: "Are you sure you want to delete this report?",
      content: `You are about to remove "${title}". This action cannot be undone.`,
      onConfirm: () => remove(index),
    });
  };

  return (
    <>
      <Stack spacing={2}>
        {!isReportSelected && report?.length > 0 && (
          <Paragraph variant="error">
            The checkbox must remain selected to retain the entered data.
          </Paragraph>
        )}

        {(isReportSelected || report?.length > 0) && (
          <>
            <FormInputDescription
              title="Periodical progress report(s)"
              subtitle="Submit external annual reports and identify its publication years."
            />
            <Grid2 container gap={1}>
              {report?.length > 0 &&
                report?.map((field, index) => (
                  <RemovableItem
                    key={`${field.title}-(${field.year})`}
                    label={`${field.title} (${field.year})`}
                    onRemove={() => openRemoveModal(index)}
                  />
                ))}
            </Grid2>
            <ButtonComponent
              startIcon={<PlusIcon fill={Theme.palette.primary.azur} />}
              customVariant="terciary-m"
              onClick={appendReport}
            >
              Add new progress report
            </ButtonComponent>
          </>
        )}
      </Stack>
      {report?.length > 0 && (
        <AddProgressReportModal
          isModalOpen={isReportModalOpen}
          setIsModalOpen={setIsReportModalOpen}
          fieldIndex={report?.length - 1}
        />
      )}
    </>
  );
}
