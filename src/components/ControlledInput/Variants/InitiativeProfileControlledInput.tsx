import ControlledInput from "@app/components/ControlledInput";
import {
  type ControlledInputProps,
  type InitiativeInformationFormData,
} from "@app/types";

export default function InitiativeProfileControlledInput(
  props: ControlledInputProps<keyof InitiativeInformationFormData>,
) {
  return <ControlledInput {...props} />;
}
