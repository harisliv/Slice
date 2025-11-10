import { type ControlledMultiSelectWithDropdownProps } from '@app/types';
import { useDropdownValues } from '@app/hooks';
import ControlledMultiSelect from './ControlledMultiSelect';

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
  customGridSize = 'full'
}: ControlledMultiSelectWithDropdownProps<T>) {
  const { data: dropdownData, isLoading } = useDropdownValues(dropdownEnpoint);

  const normalizedOptions = dropdownData.map((o) =>
    typeof o === 'string' ? { label: o, value: o } : o
  );

  return (
    <ControlledMultiSelect
      name={name}
      inputDescriptionTitle={inputDescriptionTitle}
      inputDescriptionSubtitle={inputDescriptionSubtitle}
      required={required}
      helperText={helperText}
      options={normalizedOptions}
      onApplyCapture={onApplyCapture}
      maxOptions={maxOptions}
      disabled={disabled}
      customGridSize={customGridSize}
      loading={isLoading}
    />
  );
}
