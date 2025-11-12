import type { ButtonProps } from '@mui/material';
import type { EnumWeight } from './Global';

export type TButtonStyling = {
  $backgroundColor?: string;
  $fontWeight?: EnumWeight;
  $fontSize?: string;
  $lineHeight?: string;
  $fontFamily?: string;
  $fontStyle?: 'normal' | 'italic';
  $height?: EButtonHeight;
  $width?: string;
  $minWidth?: string;
  $borderColor?: string;
  $color?: string;
  $justifyItems?: string;
  $display?: string;
  $padding?: string;
  $gap?: string;
  $borderRadius?: string;
  $textTransform?: string;
  $boxShadow?: string;
  $disabled?: boolean;
  $isHeaderMenuButton?: boolean;
  $isDrawerMenuButton?: boolean;
};

export interface IButton {
  buttonProps: ButtonProps;
  styling: TButtonStyling;
}
// TODO remove
export enum EButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary'
}

export enum EButtonHeight {
  MEDIUM = '40px',
  SMALL = '32px'
}

// TODO remove
export enum EButtonSize {
  EXTRA_BIG = '40px',
  BIG = '32px',
  MEDIUM = '24px',
  SMALL = '20px'
}

export type TButtonProps<T extends string> = {
  [key in T]: IButton;
};

export type TCustomButtonVariant =
  | 'primary-m'
  | 'primary-m-full-width'
  | 'primary-s'
  | 'secondary-m'
  | 'secondary-s'
  | 'terciary-m'
  | 'terciary-s'
  | 'header-menu'
  | 'header-menu-drawer'
  | 'edit';
