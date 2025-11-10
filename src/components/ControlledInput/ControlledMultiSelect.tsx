import { Controller, useFormContext } from 'react-hook-form';
import { type ControlledMultiSelectProps } from '@app/types';
import FormInputDescription from '../FormInputDescription';
import { get } from 'lodash';
import { Stack } from '@mui/material';
import { Multiselect } from '@app/lib/ui';

export default function ControlledMultiSelect<T extends string>({
  name,
  inputDescriptionTitle,
  inputDescriptionSubtitle,
  required,
  helperText,
  options = [],
  onApplyCapture,
  maxOptions,
  disabled,
  loading,
  customGridSize = 'full'
}: ControlledMultiSelectProps<T>) {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  const normalizedOptions = options.map((o) =>
    typeof o === 'string' ? { label: o, value: o } : o
  );

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
          <Multiselect
            name={name}
            label={inputDescriptionTitle ?? name}
            helperText={helperText}
            maxOptions={maxOptions}
            required={required}
            options={normalizedOptions}
            value={field.value ?? []}
            error={!!get(errors, name)}
            onApply={(value) => {
              field.onChange(value);
              onApplyCapture?.(value);
            }}
            disabled={disabled}
            customGridSize={customGridSize}
            loading={loading}
          />
        )}
      />
    </Stack>
  );
}
