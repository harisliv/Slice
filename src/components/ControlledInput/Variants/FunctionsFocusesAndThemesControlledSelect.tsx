import { ControlledSelectWithDropdown } from '@app/components/ControlledInput';
import {
  type ControlledSelectWithDropdownProps,
  type FunctionFocusAndThemesShape
} from '@app/types';

export default function FunctionsFocusesAndThemesControlledSelect(
  props: ControlledSelectWithDropdownProps<keyof FunctionFocusAndThemesShape>
) {
  return <ControlledSelectWithDropdown {...props} />;
}
