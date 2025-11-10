import { ControlledSelectWithDropdown } from '@app/components/ControlledInput';
import { useFormContext } from 'react-hook-form';
import type { SmartDropdownData } from '@app/types';
import Grid from '@mui/material/Grid2';
import { gridSizeMap } from '@app/lib/types';

export default function SubnationalGovernmentTypeField() {
  const { watch, setValue } = useFormContext<SmartDropdownData>();
  const tempOption = watch('tempOption');
  const readOnly = !!tempOption?.id;

  return (
    <Grid size={gridSizeMap['half']}>
      <ControlledSelectWithDropdown
        name="subnationalGovernmentType"
        inputPlaceholder="Subnational government type"
        required={true}
        dropdownEnpoint="SubNationalGovernmentType"
        noOptionsFallbackTitle="No options"
        disabled={readOnly}
        onChange={() => {
          setValue('subnationalGovernmentTypeOther', null);
        }}
      />
    </Grid>
  );
}
