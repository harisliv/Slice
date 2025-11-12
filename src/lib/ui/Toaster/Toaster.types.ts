import type { SnackbarCloseReason, SnackbarProps } from '@mui/material';

export enum ToasterType {
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface IToasterType {
  toastertype?: ToasterType;
}

export type TToasterCloseReason = SnackbarCloseReason | 'clickCloseButton';

// Exclude ownerState from SnackbarProps
type TSnackbarProps = Omit<SnackbarProps, 'ownerState'>;

export interface IToasterOptions extends TSnackbarProps, IToasterType {
  message: string;
  closeButton?: boolean;
  onCloseToaster: (
    event: React.SyntheticEvent<unknown> | Event,
    reason: TToasterCloseReason
  ) => void;
  errorDetails?: any;
}
