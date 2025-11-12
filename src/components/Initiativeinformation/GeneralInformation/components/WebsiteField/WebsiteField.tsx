import { INITIATIVE_INFORMATION_FIELD_INFO } from "@app/constants";
import { InitiativeProfileControlledInput } from "@app/components";

export default function WebsiteField() {
  return (
    <InitiativeProfileControlledInput
      name={"website"}
      customGridSize="half"
      inputDescriptionTitle={INITIATIVE_INFORMATION_FIELD_INFO.website.title}
      inputDescriptionSubtitle={
        INITIATIVE_INFORMATION_FIELD_INFO.website.subtitle
      }
    />
  );
}
