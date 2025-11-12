import type { AutocompleteProps } from "@mui/material";

export type AccountEntityOption = {
  id: string;
  name: string;
};

export type TAutocompleteProps = {
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
  options: AccountEntityOption[];
  value: AccountEntityOption | null;
  minChars?: number;
  onChange: (val: AccountEntityOption | null) => void;
  onClear?: () => void;
};

export type ACProps = AutocompleteProps<
  AccountEntityOption,
  false,
  false,
  false
>;
