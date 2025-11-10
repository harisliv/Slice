import type { ControlledCheckboxProps } from '@app/types';
import { Checkbox } from '@app/lib/ui';
import { Controller, useFormContext } from 'react-hook-form';

export default function ControlledCheckbox<T extends string>({
  name,
  onCheckboxChange
}: ControlledCheckboxProps<T>) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <Checkbox
            label="My entity is not listed"
            checked={!!field.value}
            onChange={(e) => {
              const checked = e.target.checked;
              field.onChange(checked);
              onCheckboxChange?.(checked);
            }}
          />
        </div>
      )}
    />
  );
}
