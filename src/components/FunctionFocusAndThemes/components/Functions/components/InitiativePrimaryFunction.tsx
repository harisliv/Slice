import Grid from '@mui/material/Grid2';
import {
  FunctionsFocusesAndThemesControlledSelect,
  FunctionsFocusesAndThemesControlledMultiSelect,
  FormInputDescription
} from '@app/components';
import { useFormContext } from 'react-hook-form';
import { type FunctionFormData } from '@app/types';
import FunctionsFocusesAndThemesControlledInput from '@app/components/ControlledInput/Variants/FunctionsFocusesAndThemesControlledInput';
import { Paragraph } from '@app/lib/ui';

export default function InitiativeProfileFunctions() {
  const { watch, setValue } = useFormContext<FunctionFormData>();

  const initiativePrimaryFunction = watch('initiativePrimaryFunction');
  const initiativeSecondaryFunction = watch('initiativeSecondaryFunction');

  return (
    <Grid container rowSpacing={3} columnSpacing={4}>
      <Grid size={{ sm: 12, xs: 12, xxs: 12 }}>
        <FormInputDescription title="Functions of the Initiative" required />
        <Paragraph>
          Select the most applicable primary function of the Initiative. Also
          select up to two secondary functions.
        </Paragraph>
      </Grid>
      <Grid size={{ sm: 6, xs: 12, xxs: 12 }}>
        <FunctionsFocusesAndThemesControlledSelect
          dropdownEnpoint="InitiativePrimaryFunctionTypes"
          name="initiativePrimaryFunction"
          required
          inputDescriptionTitle="Primary function"
          onChange={() => {
            setValue('initiativePrimaryFunctionOther', null);
          }}
        />
      </Grid>
      <Grid size={{ sm: 6, xs: 12, xxs: 12 }}>
        <FunctionsFocusesAndThemesControlledInput
          name="initiativePrimaryFunctionOther"
          required
          disabled={initiativePrimaryFunction !== 'Other, please explain'}
          inputDescriptionTitle="Primary function other description"
        />
      </Grid>
      <Grid size={{ sm: 6, xs: 12, xxs: 12 }}>
        <FunctionsFocusesAndThemesControlledMultiSelect
          name="initiativeSecondaryFunction"
          inputDescriptionTitle="Secondary functions"
          maxOptions={2}
          dropdownEnpoint="InitiativePrimaryFunctionTypes"
          onApplyCapture={(value: string[]) => {
            if (!value.includes('Other, please explain')) {
              setValue('initiativeSecondaryFunctionOther', null);
            }
          }}
        />
      </Grid>
      <Grid size={{ sm: 6, xs: 12, xxs: 12 }}>
        <FunctionsFocusesAndThemesControlledInput
          name="initiativeSecondaryFunctionOther"
          required
          disabled={
            !initiativeSecondaryFunction?.includes('Other, please explain')
          }
          inputDescriptionTitle="Secondary function other description"
        />
      </Grid>
    </Grid>
  );
}
