import { ControlledDatePicker } from '@app/components/ControlledInput';
import Grid from '@mui/material/Grid2';
import { gridSizeMap } from '@app/lib/types';

export default function DateJoinedField() {
  const shouldChange = () => {
    return true;
  };
  return (
    <Grid size={gridSizeMap['third']}>
      <ControlledDatePicker
        name="dateJoined"
        inputDescriptionTitle="Date joined"
        required={true}
        shouldChange={shouldChange}
        showHelperText={false}
      />
    </Grid>
  );
}
