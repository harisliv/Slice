import { DatePickerComponent } from "@app/lib/ui";
import { Controller, useFormContext } from "react-hook-form";
import { FormInputDescription } from "@app/components";
import { Stack } from "@mui/material";
import { type ControlledDatePickerProps } from "@app/types";
import dayjs from "dayjs";
import { get } from "lodash";

export default function ControlledDatePicker<T extends string>({
  name,
  required,
  customGridSize = "full",
  inputDescriptionTitle,
  inputDescriptionSubtitle,
  shouldChange = () => true,
  showHelperText = true,
  ...restProps
}: ControlledDatePickerProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const hasErrors = !!get(errors, name);
  const helperText =
    showHelperText && hasErrors
      ? String(get(errors, name)?.message)
      : undefined;

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
          <DatePickerComponent
            required={required}
            label={inputDescriptionTitle}
            error={hasErrors}
            helperText={helperText}
            customGridSize={customGridSize}
            {...field}
            value={field.value ? dayjs(field.value) : null}
            onChange={(value) => {
              const dateString = value ? value.toISOString() : null;
              // this can recieve null in order to handle clear
              const shouldChangeVal = shouldChange?.(dateString);

              if (shouldChangeVal) {
                field.onChange(dateString);
              }
            }}
            {...restProps}
          />
        )}
      />
    </Stack>
  );
}
