import { OrganizationalStructureControlledInput } from "@app/components/ControlledInput";
import { ORGANIZATIONAL_STRUCTURE_FIELD_INFO } from "@app/constants";

export default function StaffingInformation() {
  return (
    <OrganizationalStructureControlledInput
      name="staffingInformation"
      inputDescriptionTitle={
        ORGANIZATIONAL_STRUCTURE_FIELD_INFO.staffingInformation.title
      }
      inputDescriptionSubtitle={
        ORGANIZATIONAL_STRUCTURE_FIELD_INFO.staffingInformation.subtitle
      }
      helperText={
        ORGANIZATIONAL_STRUCTURE_FIELD_INFO.staffingInformation.helper
      }
      istextArea
    />
  );
}
