import { ControlledMultiSelectWithDropdown } from "@app/components/ControlledInput";
import {
  type ControlledMultiSelectWithDropdownProps,
  type OrganizationalStructureFormData,
} from "@app/types";

export default function OrganizationalStructureControlledMultiSelect(
  props: ControlledMultiSelectWithDropdownProps<
    keyof OrganizationalStructureFormData
  >,
) {
  return <ControlledMultiSelectWithDropdown {...props} />;
}
