import { Controller, useFormContext } from 'react-hook-form';
import { FormInputDescription } from '@app/components';
import { Stack, FormGroup, Box } from '@mui/material';
import { type ControlledInputProps } from '@app/types';
import { Checkbox } from '@app/lib/ui';

type Option = {
  label: string;
  value: string;
  content?: (checked: boolean) => React.ReactNode;
};

type ControlledCheckboxGroupProps<T extends string> =
  ControlledInputProps<T> & {
    options: Option[];
    onOptionChange?: (
      e: React.ChangeEvent<HTMLInputElement>,
      value: string
    ) => void;
  };

export default function ControlledCheckboxGroup<T extends string>({
  name,
  required,
  inputDescriptionTitle,
  inputDescriptionSubtitle,
  options,
  onOptionChange
}: ControlledCheckboxGroupProps<T>) {
  const { control } = useFormContext();

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
          <FormGroup>
            {options.map((opt) => (
              <Box key={opt.value}>
                <Checkbox
                  label={opt.label}
                  checked={field.value?.[opt.value] || false}
                  onChange={(e) => {
                    field.onChange({
                      ...field.value,
                      [opt.value]: e.target.checked
                    });
                    onOptionChange?.(e, opt.value);
                  }}
                />
                {opt.content?.(field.value?.[opt.value])}
              </Box>
            ))}
          </FormGroup>
        )}
      />
    </Stack>
  );
}
