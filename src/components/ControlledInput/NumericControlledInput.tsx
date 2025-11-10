import { InputComponent } from '@app/lib/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { FormInputDescription } from '@app/components';
import { Stack } from '@mui/material';
import { type ControlledInputProps } from '@app/types';
import { get, isNumber } from 'lodash';

const displayNumericFieldValue = (value: unknown) => {
  if (value === undefined || value === null || value === '') return '';
  const numValue = Number(value);
  if (!isNumber(numValue) || isNaN(numValue)) return '';
  return numValue;
};

export default function NumericControlledInput<T extends string>({
  name,
  required,
  customGridSize = 'full',
  inputDescriptionTitle,
  inputDescriptionSubtitle,
  ...restProps
}: ControlledInputProps<T>) {
  const {
    control,
    formState: { errors }
  } = useFormContext();
  return (
    <Stack spacing={2}>
      {inputDescriptionTitle && inputDescriptionSubtitle && (
        <FormInputDescription
          title={inputDescriptionTitle}
          subtitle={inputDescriptionSubtitle}
          required={required}
        />
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <InputComponent
            label={inputDescriptionTitle}
            labelFontSize="s"
            error={!!get(errors, name)}
            required={required}
            customGridSize={customGridSize}
            {...restProps}
            {...field}
            value={displayNumericFieldValue(field.value)}
            onChange={(e) => {
              const value = e.target.value;
              if (value === undefined || value === null || value === '') {
                field.onChange('');
                restProps.onChange?.(e);
                return;
              }
              const numValue = Number(value);
              if (!isNumber(numValue) || isNaN(numValue)) return;
              field.onChange(numValue);
              restProps.onChange?.(e);
            }}
          />
        )}
      />
    </Stack>
  );
}
