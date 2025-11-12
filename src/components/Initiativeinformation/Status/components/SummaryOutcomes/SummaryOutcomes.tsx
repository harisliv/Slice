import { INITIATIVE_INFORMATION_FIELD_INFO } from "@app/constants";
import { InitiativeProfileControlledInput } from "@app/components";

export default function SummaryOutcomes() {
  return (
    <InitiativeProfileControlledInput
      istextArea
      name={"summaryOutcomes"}
      required
      customGridSize="full"
      inputDescriptionTitle={
        INITIATIVE_INFORMATION_FIELD_INFO.summaryOutcomes.title
      }
      inputDescriptionSubtitle={
        INITIATIVE_INFORMATION_FIELD_INFO.summaryOutcomes.subtitle
      }
      helperText={INITIATIVE_INFORMATION_FIELD_INFO.summaryOutcomes.helper}
    />
  );
}
