import { Controller, useFormContext } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import Autocomplete from "../Autocomplete";
import type { ControlledAutocompleteProps } from "@app/types";
import type { AccountEntityDetails } from "@app/types";
import { isAccountEntityDetails } from "@app/utils/smartDropdown";
import { logger } from "@app/utils";

export default function ControlledAutocomplete<T extends string>({
  name,
  required,
  options,
  loading,
  disabled,
  onClear,
  schemaType,
}: ControlledAutocompleteProps<T>) {
  const { control, reset } = useFormContext();
  const queryClient = useQueryClient();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          required={required}
          options={options}
          value={field.value ?? { id: "", name: "" }}
          onChange={(opt) => {
            if (opt?.id) {
              const cachedData = queryClient.getQueryData<AccountEntityDetails>(
                ["entityDetails", opt.id],
              );

              if (isAccountEntityDetails(cachedData)) {
                logger.info("Cache hit on account entity:", cachedData);
                const dataWithTempOption = {
                  ...cachedData,
                  schemaType,
                  tempOption: {
                    id: opt.id,
                    name: cachedData.name,
                  },
                };
                reset?.(dataWithTempOption);
                return;
              }
              field.onChange(opt);
            }
          }}
          placeholder={
            loading
              ? "Loading…"
              : "Search entity by keyword, filter (list from CRM)"
          }
          disabled={disabled}
          onClear={onClear}
          // If your SmartDropdown supports an error prop, pass !!errors.option
        />
      )}
    />
  );
}
