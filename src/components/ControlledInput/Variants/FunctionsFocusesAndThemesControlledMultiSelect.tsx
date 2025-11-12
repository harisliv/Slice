import {
  type ControlledMultiSelectWithDropdownProps,
  type FunctionFocusAndThemesShape,
} from "@app/types";
import ControlledMultiSelectWithDropdown from "../ControlledMultiSelectWithDropdown";

export default function FunctionsFocusesAndThemesControlledMultiSelect(
  props: ControlledMultiSelectWithDropdownProps<
    keyof FunctionFocusAndThemesShape
  >,
) {
  return <ControlledMultiSelectWithDropdown {...props} />;
}
