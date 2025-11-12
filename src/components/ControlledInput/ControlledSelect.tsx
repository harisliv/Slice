import { Select } from '@app/lib/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { type ControlledSelectProps } from '@app/types';
import { Stack } from '@mui/material';
import FormInputDescription from '../FormInputDescription';
import { get } from 'lodash';

export default function ControlledSelect<T extends string>({
  name,
  inputDescriptionTitle,
  inputDescriptionSubtitle,
  customGridSize = 'full',
  required,
  helperText,
  inputPlaceholder,
  loading,
  ...restProps
}: ControlledSelectProps<T>) {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <Stack spacing={3}>
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
        rules={{ required }}
        render={({ field }) => (
          <Select
            helperText={helperText}
            label={inputPlaceholder ?? inputDescriptionTitle}
            required={required}
            error={!!get(errors, name)}
            customGridSize={customGridSize}
            {...restProps}
            {...field}
            value={field.value ?? ''}
            handleClear={() => {
              field?.onChange('', { shouldValidate: true });
            }}
            defaultValue={''}
            onChange={(event, option) => {
              field.onChange(event);
              restProps.onChange?.(event, option);
            }}
          />
        )}
      />
    </Stack>
  );
}
