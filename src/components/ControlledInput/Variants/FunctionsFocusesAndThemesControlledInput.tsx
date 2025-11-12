import ControlledInput from '@app/components/ControlledInput';
import {
  type ControlledInputProps,
  type FunctionFocusAndThemesShape
} from '@app/types';

export default function FunctionsFocusesAndThemesControlledInput(
  props: ControlledInputProps<keyof FunctionFocusAndThemesShape>
) {
  return <ControlledInput {...props} />;
}
