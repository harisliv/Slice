import type { RadioGroupProps } from "@mui/material";

export interface TRadioGroupProps extends RadioGroupProps {
  options?: { label: string; value: string }[];
  name: string;
  id?: string;
  error?: boolean;
  control?: React.ReactElement;
}
