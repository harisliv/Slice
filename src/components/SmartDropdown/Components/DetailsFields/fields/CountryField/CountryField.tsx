import { ControlledSelectWithDropdown } from "@app/components/ControlledInput";
import { useFormContext } from "react-hook-form";
import type { SmartDropdownData, TCustomGridSizeProps } from "@app/types";
import Grid from "@mui/material/Grid2";
import { gridSizeMap } from "@app/lib/types";

export default function CountryField({
  customGridSize,
}: TCustomGridSizeProps = {}) {
  const { watch } = useFormContext<SmartDropdownData>();
  const tempOption = watch("tempOption");
  const readOnly = !!tempOption?.id;

  return (
    <Grid size={gridSizeMap[customGridSize ?? "half"]}>
      <ControlledSelectWithDropdown
        name="country"
        inputPlaceholder="Country"
        required={true}
        dropdownEnpoint="Countries"
        disabled={readOnly}
      />
    </Grid>
  );
}
