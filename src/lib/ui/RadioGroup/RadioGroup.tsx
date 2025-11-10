import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import type { TRadioGroupProps } from './RadioGroup.types';

export default function RadioButtonsGroup({
  options = [],
  defaultValue,
  name,
  id,
  control = <Radio />,
  error,
  ...props
}: TRadioGroupProps) {
  return (
    <FormControl error={error}>
      <RadioGroup
        aria-labelledby={id}
        defaultValue={defaultValue}
        name={name}
        {...props}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={control}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
