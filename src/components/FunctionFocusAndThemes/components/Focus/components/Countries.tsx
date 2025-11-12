import {
  FormInputDescription,
  FunctionsFocusesAndThemesControlledMultiSelect
} from '@app/components';
import { useFormContext } from 'react-hook-form';
import type { FocusesFormData } from '@app/types';

export default function Countries() {
  const { watch } = useFormContext<FocusesFormData>();
  const initiativeGeographicalFocus = watch('initiativeGeographicalFocus');

  return (
    <>
      <FormInputDescription
        title="National"
        subtitle="Select the applicable country"
        required
      />
      <FunctionsFocusesAndThemesControlledMultiSelect
        name="countries"
        required
        customGridSize="half"
        dropdownEnpoint="Countries"
        inputDescriptionTitle="Country"
        maxOptions={initiativeGeographicalFocus === 'National' ? 1 : undefined}
      />
    </>
  );
}
