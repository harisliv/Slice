import { RadioGroup } from '@app/lib/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { FormInputDescription } from '@app/components';
import { Stack } from '@mui/material';
import { INITIATIVE_INFORMATION_FIELD_INFO } from '@app/constants';
import { useDropdownValues } from '@app/hooks';
import {
  defaultInitiativeInformationFormValues,
  type InitiativeInformationFormData
} from '@app/types';
import { get } from 'lodash';

export default function InitiativeStatus() {
  const { data: initiativeStatuses } = useDropdownValues('InitiativeStatus');
  const {
    setValue,
    trigger,
    control,
    formState: { errors }
  } = useFormContext<InitiativeInformationFormData>();

  return (
    <Stack spacing={2}>
      <FormInputDescription
        title={INITIATIVE_INFORMATION_FIELD_INFO.initiativeStatus.title}
        subtitle={INITIATIVE_INFORMATION_FIELD_INFO.initiativeStatus.subtitle}
        required
      />
      <Controller
        name={'initiativeStatus'}
        control={control}
        render={({ field }) => (
          <RadioGroup
            {...field}
            onChange={(e) => {
              field.onChange(e.target.value);
              if (e.target.value.toLowerCase() !== 'concluded') {
                setValue('explanationStatus', null);
                setValue('summaryOutcomes', null);
                setValue(
                  'closureReport',
                  defaultInitiativeInformationFormValues.closureReport
                );
              }
              trigger();
            }}
            value={field.value ?? ''}
            options={initiativeStatuses}
            error={!!get(errors, 'initiativeStatus')}
          />
        )}
      />
    </Stack>
  );
}
