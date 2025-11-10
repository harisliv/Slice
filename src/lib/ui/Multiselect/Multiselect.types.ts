import type { CustomSize, ISelectBase, Option } from '@app/lib/types';

export interface MultiSelectOption {
  label: string;
  value: string;
}

export type IMultiSelect = ISelectBase & {
  label: string;
  name: string;
  helperText?: string;
  required?: boolean;
  options: Option[];
  value: string[];
  maxOptions?: number;
  error?: boolean;
  onApply: (value: string[]) => void;
  customGridSize?: CustomSize;
  loading?: boolean;
};
