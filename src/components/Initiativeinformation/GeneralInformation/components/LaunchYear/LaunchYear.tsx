import { INITIATIVE_INFORMATION_FIELD_INFO } from "@app/constants";
import { InitiativeProfileNumericControlledInput } from "@app/components";
import { useFormContext } from "react-hook-form";
import type { InitiativeInformationFormData } from "@app/types";

export default function LaunchYear() {
  const { trigger } = useFormContext<InitiativeInformationFormData>();
  return (
    <InitiativeProfileNumericControlledInput
      name="launchDate"
      required
      customGridSize="half"
      inputDescriptionTitle={INITIATIVE_INFORMATION_FIELD_INFO.launchDate.title}
      inputDescriptionSubtitle={
        INITIATIVE_INFORMATION_FIELD_INFO.launchDate.subtitle
      }
      onChange={() => {
        trigger("expectedEndDate");
      }}
    />
  );
}
