import { ControlledSelect } from '@app/components/ControlledInput';
import {
  type ControlledSelectProps,
  type TimeframeOfInformationFormData
} from '@app/types';

export default function TimeframeOfInformationControlledSelect(
  props: ControlledSelectProps<keyof TimeframeOfInformationFormData>
) {
  return <ControlledSelect {...props} />;
}
