import { ControlledSelect } from '@app/components/ControlledInput';
// import { Select } from "@app/lib/ui"
import {
  type ControlledSelectProps,
  type GoalsTargetsAndMonitoringShape
} from '@app/types';

export default function GoalsTargetsAndMonitoringControlledSelect(
  props: ControlledSelectProps<keyof GoalsTargetsAndMonitoringShape>
) {
  return <ControlledSelect {...props} />;
}
