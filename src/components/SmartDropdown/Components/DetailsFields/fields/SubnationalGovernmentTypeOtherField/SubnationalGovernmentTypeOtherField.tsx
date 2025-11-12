import ControlledInput from '@app/components/ControlledInput';
import { useFormContext } from 'react-hook-form';
import type { SmartDropdownData } from '@app/types';
import Grid from '@mui/material/Grid2';
import { gridSizeMap } from '@app/lib/types';

export default function SubnationalGovernmentTypeOtherField() {
  const { watch } = useFormContext<SmartDropdownData>();
  const tempOption = watch('tempOption');
  const readOnly = !!tempOption?.id;

  return (
    <Grid size={gridSizeMap['half']}>
      <ControlledInput
        name="subnationalGovernmentTypeOther"
        inputDescriptionTitle="Subnational Government type other"
        required={true}
        disabled={readOnly}
      />
    </Grid>
  );
}
