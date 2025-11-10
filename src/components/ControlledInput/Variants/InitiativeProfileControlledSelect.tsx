import { ControlledSelectWithDropdown } from '@app/components/ControlledInput';
import {
  type ControlledSelectWithDropdownProps,
  type InitiativeInformationFormData
} from '@app/types';

export default function InitiativeProfileControlledSelect(
  props: ControlledSelectWithDropdownProps<keyof InitiativeInformationFormData>
) {
  return <ControlledSelectWithDropdown {...props} />;
}
