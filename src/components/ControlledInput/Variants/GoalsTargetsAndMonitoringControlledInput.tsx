import ControlledInput from '@app/components/ControlledInput';
import {
  type ControlledInputProps,
  type GoalsTargetsAndMonitoringShape
} from '@app/types';

export default function GoalsTargetsAndMonitoringControlledInput(
  props: ControlledInputProps<keyof GoalsTargetsAndMonitoringShape>
) {
  return <ControlledInput {...props} />;
}
