import { type ControlledMultiSelectWithDropdownProps } from "@app/types";
import { useDropdownValues } from "@app/hooks";
import ControlledMultiSelect from "./ControlledMultiSelect";

export default function ControlledMultiSelectWithDropdown<T extends string>({
  name,
  inputDescriptionTitle,
  inputDescriptionSubtitle,
  required,
  helperText,
  onApplyCapture,
  maxOptions,
  disabled,
  dropdownEnpoint,
  customGridSize = "full",
}: ControlledMultiSelectWithDropdownProps<T>) {
  const { data: options, isLoading } = useDropdownValues(dropdownEnpoint);

  return (
    <ControlledMultiSelect
      name={name}
      inputDescriptionTitle={inputDescriptionTitle}
      inputDescriptionSubtitle={inputDescriptionSubtitle}
      required={required}
      helperText={helperText}
      options={options}
      onApplyCapture={onApplyCapture}
      maxOptions={maxOptions}
      disabled={disabled}
      customGridSize={customGridSize}
      loading={isLoading}
    />
  );
}
