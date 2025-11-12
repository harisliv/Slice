import {
  type ControlledInputProps,
  type InitiativeInformationFormData
} from '@app/types';
import NumericControlledInput from '../NumericControlledInput';

export default function InitiativeProfileNumericControlledInput(
  props: ControlledInputProps<keyof InitiativeInformationFormData>
) {
  return <NumericControlledInput {...props} />;
}
