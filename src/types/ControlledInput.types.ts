import type { AccountEntityOption } from '@app/components/Autocomplete/Autocomplete.types';
import type { CustomSize, IInputBase, ISelect } from '@app/lib/types';
import { type TUploadedFile } from '@app/types/InitiativeProfile/InitiativeProfile.types';
import type { CheckboxProps } from '@mui/material';
import type { DatePickerProps } from '@mui/x-date-pickers';
import type { Dayjs } from 'dayjs';
import type { DropdownName } from './Dropdown.types';
import type { SCHEMA_TYPE } from './SmartDropdown.types';

export type TControlledInputBase = {
  customGridSize?: CustomSize;
  inputDescriptionTitle?: string;
  inputDescriptionSubtitle?: string;
};

export interface ControlledInputProps<T extends string>
  extends IInputBase,
    TControlledInputBase {
  name: T;
}

export type ControlledAutocompleteProps<T extends string> = IInputBase &
  TControlledInputBase & {
    name: T;
    required?: boolean;
    options: AccountEntityOption[];
    loading?: boolean;
    disabled?: boolean;
    onClear?: () => void;
    customOnChange?: (value: AccountEntityOption | null) => void;
    schemaType?: SCHEMA_TYPE;
  };

export type ControlledCheckboxProps<T extends string> = CheckboxProps & {
  name: T;
  onCheckboxChange?: (value: boolean) => void;
};

export type ControlledSelectProps<T extends string> = ISelect &
  TControlledInputBase & {
    name: T;
    helperText?: string;
    inputPlaceholder?: string;
    loading?: boolean;
  };

export type ControlledSelectWithDropdownProps<T extends string> = ISelect &
  TControlledInputBase & {
    name: T;
    helperText?: string;
    inputPlaceholder?: string;
    dropdownEnpoint: DropdownName;
  };

export type ControlledMultiSelectProps<T extends string> = ISelect &
  TControlledInputBase & {
    name: T;
    helperText?: string;
    maxOptions?: number;
    onApplyCapture?: (value: string[]) => void;
  };

export type ControlledMultiSelectWithDropdownProps<T extends string> = ISelect &
  TControlledInputBase & {
    name: T;
    helperText?: string;
    maxOptions?: number;
    onApplyCapture?: (value: string[]) => void;
    dropdownEnpoint: DropdownName;
  };

export interface ControlledDatePickerProps<T extends string>
  extends DatePickerProps<Dayjs, boolean> {
  name: T;
  error?: boolean;
  required?: boolean;
  customGridSize?: CustomSize;
  inputDescriptionTitle?: string;
  inputDescriptionSubtitle?: string;
  shouldChange?: (date: string | null) => boolean;
  showHelperText?: boolean;
}

export interface ControlledUploaderProps {
  name: string;
  error?: boolean;
  required?: boolean;
  customGridSize?: CustomSize;
  inputDescriptionTitle?: string;
  inputDescriptionSubtitle?: string;
  accept: { [key: string]: string[] };
  type: 'Initiative' | 'ProgressReport';
  serverValue?: TUploadedFile | null;
  fileMaxSize?: number;
}

export type TCustomGridSizeProps = {
  customGridSize?: CustomSize;
  offset?: CustomSize;
};
