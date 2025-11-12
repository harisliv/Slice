import { Grid2, MenuItem, Skeleton } from "@mui/material";
import { useState } from "react";
import { ButtonComponent, Checkbox, MaxOptions } from "@app/lib/ui";
import type { IMultiSelect } from "./Multiselect.types";
import {
  StyledFormControl,
  StyledFormHelperText,
  StyledInput,
  StyledInputLabel,
  StyledSelect,
} from "../Select/Select.styles";
import { StyledFooterBox, StyledFooterListItem } from "./Multiselect.styles";
import { gridSizeMap } from "@app/lib/types";

export default function MultiSelect({
  label,
  name,
  helperText,
  required,
  options,
  value,
  maxOptions,
  error,
  inputProps = {},
  onApply,
  customGridSize = "full",
  loading,
  disabled,
  ...props
}: IMultiSelect) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tempValue, setTempValue] = useState<string[]>([]);

  const appliedValue = Array.isArray(value) ? value : [];
  const selectValue = menuOpen ? tempValue : appliedValue;

  const renderInputLabel = (
    <StyledInputLabel
      required={required}
      id={`${name}-label`}
      data-testid={"multiselect.inputLabel"}
    >
      {label}
    </StyledInputLabel>
  );

  const maxOptionsValue =
    typeof maxOptions === "number" ? maxOptions : options.length;

  const showMaxOptionsNotification = tempValue.length === maxOptionsValue;

  return (
    <>
      <Grid2 container>
        <Grid2 size={gridSizeMap[customGridSize]}>
          <StyledFormControl fullWidth disabled={disabled} error={error}>
            {label && renderInputLabel}
            {loading ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={48}
                sx={{ boarderRadius: "8px" }}
              />
            ) : (
              <StyledSelect
                {...props}
                defaultValue={[""]}
                name={name}
                required={required}
                disabled={disabled || !options || options.length === 0}
                multiple
                value={selectValue}
                input={
                  <StyledInput
                    name={name}
                    inputProps={{
                      ...inputProps,
                      "data-testid": "select.input",
                    }}
                  />
                }
                open={menuOpen}
                onOpen={() => {
                  setTempValue(appliedValue);
                  setMenuOpen(true);
                }}
                onClose={() => setMenuOpen(false)}
                onChange={(event) => {
                  const newVal = event.target.value;
                  if (
                    Array.isArray(newVal) &&
                    newVal.length <= maxOptionsValue
                  ) {
                    setTempValue(newVal);
                  }
                }}
                renderValue={() => {
                  const vals = menuOpen ? tempValue : appliedValue;
                  const labels = options
                    .filter((o) => vals.includes(o.value))
                    .map((o) => o.label);
                  return labels.join(", ");
                }}
                MenuProps={{
                  PaperProps: {
                    sx: { maxHeight: 360 },
                  },
                  MenuListProps: {
                    sx: {
                      maxHeight: 300,
                      overflowY: "auto",
                      position: "relative",
                      p: 0,
                    },
                  },
                }}
              >
                {options.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    <Checkbox
                      checked={tempValue.includes(opt.value)}
                      disabled={
                        tempValue.length >= maxOptionsValue &&
                        !tempValue.includes(opt.value)
                      }
                      label={opt.label}
                    />
                  </MenuItem>
                ))}

                {showMaxOptionsNotification && <MaxOptions />}

                <StyledFooterListItem>
                  <StyledFooterBox>
                    <ButtonComponent
                      customVariant="secondary-s"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTempValue([]);
                      }}
                    >
                      Clear
                    </ButtonComponent>
                    <ButtonComponent
                      customVariant="primary-s"
                      onClick={(e) => {
                        e.stopPropagation();
                        const filteredValue = tempValue.filter(
                          (item) => String(item).trim() !== "",
                        );
                        onApply(filteredValue);
                        setMenuOpen(false);
                      }}
                    >
                      Apply selection
                    </ButtonComponent>
                  </StyledFooterBox>
                </StyledFooterListItem>
              </StyledSelect>
            )}
          </StyledFormControl>
        </Grid2>
      </Grid2>
      <StyledFormHelperText>{helperText}</StyledFormHelperText>
    </>
  );
}
