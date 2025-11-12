import { type ControlledSelectWithDropdownProps } from "@app/types";
import { useDropdownValues } from "@app/hooks";
import ControlledSelect from "./ControlledSelect";

export default function ControlledSelectWithDropdown<T extends string>({
  name,
  inputDescriptionTitle,
  inputDescriptionSubtitle,
  customGridSize = "full",
  required,
  helperText,
  inputPlaceholder,
  dropdownEnpoint,
  ...restProps
}: ControlledSelectWithDropdownProps<T>) {
  const { data: options, isLoading } = useDropdownValues(dropdownEnpoint);

  return (
    <ControlledSelect
      name={name}
      inputDescriptionTitle={inputDescriptionTitle}
      inputDescriptionSubtitle={inputDescriptionSubtitle}
      customGridSize={customGridSize}
      required={required}
      helperText={helperText}
      inputPlaceholder={inputPlaceholder}
      options={options}
      loading={isLoading}
      {...restProps}
    />
  );
}
