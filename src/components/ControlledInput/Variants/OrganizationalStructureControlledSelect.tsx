import { ControlledSelectWithDropdown } from "@app/components/ControlledInput";
import {
  type ControlledSelectWithDropdownProps,
  type OrganizationalStructureFormData,
} from "@app/types";

export default function OrganizationalStructureControlledSelect(
  props: ControlledSelectWithDropdownProps<
    keyof OrganizationalStructureFormData
  >,
) {
  return <ControlledSelectWithDropdown {...props} />;
}
