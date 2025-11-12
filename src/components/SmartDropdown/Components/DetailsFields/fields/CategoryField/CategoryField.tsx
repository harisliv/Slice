import { ControlledSelectWithDropdown } from "@app/components/ControlledInput";
import Grid from "@mui/material/Grid2";
import { gridSizeMap } from "@app/lib/types";

export default function CategoryField() {
  return (
    <Grid size={gridSizeMap["third"]}>
      <ControlledSelectWithDropdown
        name="category"
        inputDescriptionTitle="Category"
        required={true}
        dropdownEnpoint="ParticipantCategory"
      />
    </Grid>
  );
}
