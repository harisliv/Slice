import ControlledInput from '@app/components/ControlledInput';
import { useFormContext } from 'react-hook-form';
import type { SmartDropdownData, TCustomGridSizeProps } from '@app/types';
import Grid from '@mui/material/Grid2';
import { gridSizeMap } from '@app/lib/types';

export default function LegalNameField({
  customGridSize
}: TCustomGridSizeProps = {}) {
  const { watch } = useFormContext<SmartDropdownData>();
  const tempOption = watch('tempOption');
  const readOnly = !!tempOption?.id;

  return (
    <Grid size={gridSizeMap[customGridSize ?? 'full']}>
      <ControlledInput
        name="legalName"
        inputDescriptionTitle="Legal name"
        required={false}
        disabled={readOnly}
      />
    </Grid>
  );
}
