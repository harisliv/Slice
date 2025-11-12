import { ControlledCheckboxGroup, ControlledInput } from "@app/components";
import { Divider, Stack } from "@mui/material";
import { PeriodicalProgressReport } from "./components/PeriodicalProgressReport";
import { MONITORING_FIELD_INFO } from "@app/constants";
import { useFormContext } from "react-hook-form";
import type { MonitoringFormData } from "@app/types";

export default function Monitoring() {
  const { setValue } = useFormContext<MonitoringFormData>();

  return (
    <Stack spacing={2} paddingBottom={1}>
      <ControlledInput
        name={"progress"}
        required
        inputDescriptionTitle={MONITORING_FIELD_INFO.progress.title}
        inputDescriptionSubtitle={MONITORING_FIELD_INFO.progress.subtitle}
        istextArea
        helperText={MONITORING_FIELD_INFO.progress.helper}
      />
      <Divider />
      <ControlledCheckboxGroup
        name="publicReportingOptions"
        required
        inputDescriptionTitle={
          MONITORING_FIELD_INFO.publicReportingOptions.title
        }
        inputDescriptionSubtitle={
          MONITORING_FIELD_INFO.publicReportingOptions.subtitle
        }
        onOptionChange={(e, v) => {
          if (v === "checkbox3" && !e.target.checked) {
            setValue("publicReportingOther", null);
          }
        }}
        options={[
          {
            label:
              MONITORING_FIELD_INFO.publicReportingOptions.fields.checkbox1,
            value: "checkbox1",
          },
          {
            label:
              MONITORING_FIELD_INFO.publicReportingOptions.fields.checkbox2,
            value: "checkbox2",
            content: () => <PeriodicalProgressReport />,
          },
          {
            label:
              MONITORING_FIELD_INFO.publicReportingOptions.fields.checkbox3,
            value: "checkbox3",
            content: (checked) =>
              checked ? (
                <ControlledInput
                  name={"publicReportingOther"}
                  required
                  inputDescriptionTitle={
                    MONITORING_FIELD_INFO.publicReportingOther.title
                  }
                  helperText={MONITORING_FIELD_INFO.publicReportingOther.helper}
                />
              ) : null,
          },
        ]}
      />
    </Stack>
  );
}
