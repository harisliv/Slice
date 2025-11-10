import type { CustomSize } from './Global';
import type { ISelectBase } from './SelectBase';

export type Option = {
  label: string;
  value: string;
};

export type ISelect = ISelectBase & {
  defaultValue?: string;
  onSelectChange?: (option: Option) => void;
  noOptionsFallbackTitle?: string;
  noOptionsFallbackSubtitle?: string;
  setOptions?: (value: React.SetStateAction<string[]>) => void;
  options?: Option[];
  handleClear?: () => void;
  helperText?: string;
  customGridSize?: CustomSize;
  loading?: boolean;
  borderless?: boolean;
};
