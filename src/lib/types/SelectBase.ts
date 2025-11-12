import type { SelectProps } from '@mui/material';

export type ISelectBase = SelectProps & {
  name: string;
  error?: boolean;
  label?: string;
  footnote?: string;
  tooltip?: string;
  noFootnote?: boolean;
  className?: string;
  shrink?: boolean;
  placeholder?: string;
};
