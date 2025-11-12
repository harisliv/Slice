import { ControlledMultiSelectWithDropdown } from '@app/components/ControlledInput';
import Grid from '@mui/material/Grid2';
import { gridSizeMap } from '@app/lib/types';

export default function AssignedRolesField() {
  return (
    <Grid size={gridSizeMap['full']}>
      <ControlledMultiSelectWithDropdown
        name="assignedRoles"
        inputDescriptionTitle="Assign role"
        required={true}
        dropdownEnpoint="InvolvedEntityType"
      />
    </Grid>
  );
}
