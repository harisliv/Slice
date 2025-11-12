import { StyledFormControlLabel, StyledMuiCheckbox } from './Checkbox.styles';

type CheckboxProps = {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Checkbox({
  label,
  checked,
  disabled,
  onChange
}: CheckboxProps) {
  return (
    <StyledFormControlLabel
      control={<StyledMuiCheckbox checked={checked} onChange={onChange} />}
      label={label}
      disabled={disabled}
    />
  );
}
