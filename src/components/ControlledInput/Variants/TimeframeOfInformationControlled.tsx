import ControlledInput from '@app/components/ControlledInput';
import {
  type ControlledInputProps,
  type TimeframeOfInformationFormData
} from '@app/types';

export default function TimeframeOfInformationControlledInput(
  props: ControlledInputProps<keyof TimeframeOfInformationFormData>
) {
  return <ControlledInput {...props} />;
}
