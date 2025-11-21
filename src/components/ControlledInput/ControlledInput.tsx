import {
  Controller,
  useFormContext,
  type ControllerRenderProps
} from 'react-hook-form';
import { FormInputDescription } from '@app/components';
import { Stack } from '@mui/material';
import { type ControlledInputProps } from '@app/types';
import { get, debounce } from 'lodash';
import { useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { CustomSize, IInputBase } from '@app/lib/types';
import { InputComponent } from '@app/lib/ui';

function DebouncedInput({
  field,
  label,
  labelFontSize,
  error,
  required,
  customGridSize,
  ...restProps
}: {
  field: ControllerRenderProps;
  label?: ReactNode;
  labelFontSize?: IInputBase['labelFontSize'];
  error?: boolean;
  required?: boolean;
  customGridSize?: CustomSize;
} & Omit<IInputBase, 'value' | 'onChange' | 'onBlur' | 'name'>) {
  const [localValue, setLocalValue] = useState(field.value ?? '');

  const debouncedOnChange = useMemo(
    () =>
      debounce((value: string) => {
        field.onChange(value);
      }, 500),
    [field.onChange]
  );

  useEffect(() => {
    setLocalValue(field.value ?? '');
  }, [field.value]);

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  return (
    <InputComponent
      label={label}
      labelFontSize={labelFontSize}
      error={error}
      required={required}
      customGridSize={customGridSize}
      {...restProps}
      value={localValue}
      onChange={(e) => {
        const value = e.target.value;
        setLocalValue(value);
        debouncedOnChange(value);
      }}
      onBlur={field.onBlur}
      name={field.name}
    />
  );
}

export default function ControlledInput<T extends string>({
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
          <DebouncedInput
            field={field}
            label={inputDescriptionTitle}
            labelFontSize="s"
            error={!!get(errors, name)}
            required={required}
            customGridSize={customGridSize}
            {...restProps}
          />
        )}
      />
    </Stack>
  );
}
