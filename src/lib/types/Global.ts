import type { FC } from 'react';
import type { ErrorResponse } from 'react-router';
import type { WebTarget } from 'styled-components';

export enum EnumWeight {
  extraBold = 800,
  bold = 700,
  extraNormal = 500,
  normal = 400,
  light = 300,
  extraLight = 200
}

export enum EnumLineHeight {
  extraSmall = '19px',
  small = '20px',
  medium = '22px',
  large = '24px'
}

export interface ITypography {
  color?: string;
  fontWeight?: EnumWeight;
  fontSize?: string;
  $lineHeight?: string;
  fontFamily?: string;
  fontStyle?: 'normal' | 'italic';
  $textTransform?: 'uppercase' | 'lowercase' | 'capitalize';
}

export type TTypographyProps<T extends string> = {
  [key in T]: ITypography;
};

export type TLinkComponentProps = {
  url: string;
  tabIndex: number;
  text: string;
  $disabled: boolean;
};

export type TExternalNavLink = React.FunctionComponent<TLinkComponentProps>;

export type TCustomComponentToStyle = WebTarget;
export type TErrorResponse = ErrorResponse;
export enum TagStatus {
  SUBMITTED = 'SUBMITTED',
  DRAFT = 'DRAFT',
  CONCLUDED = 'CONCLUDED',
  ACTIVE = 'ACTIVE',
  ACCOMPLISHED = 'ACCOMPLISHED',
  INACTIVE = 'INACTIVE'
}

export type TRouterLink = FC<{ to: string }>;

export type CustomSize = 'full' | 'half' | 'third' | 'quarter' | 'twoThrids';

export const gridSizeMap: {
  [key in CustomSize]: {
    xxs: number;
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
} = {
  third: { xxs: 12, xs: 12, sm: 12, md: 4, lg: 4, xl: 4 },
  quarter: { xxs: 12, xs: 12, sm: 12, md: 3, lg: 3, xl: 3 },
  half: { xxs: 12, xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
  twoThrids: { xxs: 12, xs: 12, sm: 12, md: 8, lg: 8, xl: 8 },
  full: { xxs: 12, xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }
};
