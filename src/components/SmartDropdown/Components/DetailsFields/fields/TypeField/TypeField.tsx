import { ControlledSelectWithDropdown } from '@app/components/ControlledInput';
import { useFormContext } from 'react-hook-form';
import type { SmartDropdownData, TCustomGridSizeProps } from '@app/types';
import Grid from '@mui/material/Grid2';
import { gridSizeMap } from '@app/lib/types';

export default function TypeField({
  customGridSize
}: TCustomGridSizeProps = {}) {
  const { watch, setValue } = useFormContext<SmartDropdownData>();
  const tempOption = watch('tempOption');
  const readOnly = !!tempOption?.id;
  const conditionalEndpoint = readOnly ? 'ParticipantType' : 'AccountType';

  return (
    <Grid size={gridSizeMap[customGridSize ?? 'full']}>
      <ControlledSelectWithDropdown
        name="type"
        inputPlaceholder="Type"
        required={true}
        dropdownEnpoint={conditionalEndpoint}
        noOptionsFallbackTitle="No options"
        disabled={readOnly}
        onChange={() => {
          setValue('legalName', null);
          setValue('identityType', null);
          setValue('identityNumber', null);
          setValue('businessActivity', null);
          setValue('subnationalGovernmentType', null);
          setValue('subnationalGovernmentTypeOther', null);
        }}
      />
    </Grid>
  );
}
