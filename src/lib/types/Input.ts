import type { OutlinedTextFieldProps } from '@mui/material';
import type { ReactNode } from 'react';
import type { DefaultTheme } from 'styled-components';
import type { CustomSize } from './Global';

type IOutlinedTextFieldProps = Omit<OutlinedTextFieldProps, 'variant'>;

export interface IInputBase extends IOutlinedTextFieldProps {
  icon?: ReactNode;
  rightIcon?: boolean;
  showErrorIcon?: boolean;
  focusOnMount?: boolean;
  integer?: boolean;
  istextArea?: boolean;
  rightAdornment?: ReactNode;
  keyboardEventsEnabled?: boolean;
  labelFontSize?: keyof DefaultTheme['fontSizes']['body'];
  enableLabel?: boolean;
  customGridSize?: CustomSize;
}
