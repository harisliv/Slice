import ControlledInput from '@app/components/ControlledInput';
import {
  type ControlledInputProps,
  type OrganizationalStructureFormData
} from '@app/types';

export default function OrganizationalStructureControlledInput(
  props: ControlledInputProps<keyof OrganizationalStructureFormData>
) {
  return <ControlledInput {...props} />;
}
