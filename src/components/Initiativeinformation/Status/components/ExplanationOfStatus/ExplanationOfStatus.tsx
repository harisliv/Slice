import { INITIATIVE_INFORMATION_FIELD_INFO } from "@app/constants";
import { InitiativeProfileControlledInput } from "@app/components";

export default function ExplanationOfStatus() {
  return (
    <InitiativeProfileControlledInput
      helperText={INITIATIVE_INFORMATION_FIELD_INFO.explanationStatus.helper}
      istextArea
      name={"explanationStatus"}
      required
      customGridSize="full"
      inputDescriptionTitle={
        INITIATIVE_INFORMATION_FIELD_INFO.explanationStatus.title
      }
      inputDescriptionSubtitle={
        INITIATIVE_INFORMATION_FIELD_INFO.explanationStatus.subtitle
      }
    />
  );
}
