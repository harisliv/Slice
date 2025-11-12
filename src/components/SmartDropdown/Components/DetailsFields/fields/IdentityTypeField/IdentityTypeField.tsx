import { ControlledSelectWithDropdown } from '@app/components/ControlledInput';
import { useFormContext } from 'react-hook-form';
import type { SmartDropdownData } from '@app/types';
import Grid from '@mui/material/Grid2';
import { gridSizeMap } from '@app/lib/types';

export default function IdentityTypeField() {
  const { watch } = useFormContext<SmartDropdownData>();
  const tempOption = watch('tempOption');
  const readOnly = !!tempOption?.id;

  return (
    <Grid size={gridSizeMap['half']}>
      <ControlledSelectWithDropdown
        name="identityType"
        inputPlaceholder="Identity type"
        required={false}
        dropdownEnpoint="IdentifyProviderType"
        noOptionsFallbackTitle="No options"
        disabled={readOnly}
      />
    </Grid>
  );
}
