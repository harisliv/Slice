import { ControlledSelectWithDropdown } from "@app/components/ControlledInput";
import { useFormContext } from "react-hook-form";
import type { SmartDropdownData } from "@app/types";
import Grid from "@mui/material/Grid2";
import { gridSizeMap } from "@app/lib/types";

export default function BusinessActivityField() {
  const { watch } = useFormContext<SmartDropdownData>();
  const tempOption = watch("tempOption");
  const readOnly = !!tempOption?.id;

  return (
    <Grid size={gridSizeMap["full"]}>
      <ControlledSelectWithDropdown
        name="businessActivity"
        inputPlaceholder="Business activity"
        required={false}
        dropdownEnpoint="BusinessActivities"
        noOptionsFallbackTitle="No options"
        disabled={readOnly}
      />
    </Grid>
  );
}
