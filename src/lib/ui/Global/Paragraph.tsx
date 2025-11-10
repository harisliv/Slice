import { Theme } from '@app/lib/general';
import type { ITypography, TTypographyProps } from '@app/lib/types';
import { EnumLineHeight, EnumWeight } from '@app/lib/types';
import { P } from './Global.styles';
import type { ReactNode } from 'react';

type TParagraphVariants =
  | 'extrasmall-regular'
  | 'extrasmall-medium'
  | 'extrasmall-regular-green'
  | 'small-regular'
  | 'small-regular-azur'
  | 'small-bold'
  | 'medium-regular'
  | 'medium-regular-blue'
  | 'medium-bold'
  | 'large-regular'
  | 'large-regular-blue'
  | 'large-bold'
  | 'error';
const paragraphBaseProps: ITypography = {
  fontSize: Theme.fontSizes.body.m,
  $lineHeight: EnumLineHeight.small,
  fontFamily: Theme.fontFamilies.Roboto,
  fontWeight: EnumWeight.normal,
  color: Theme.palette.primary.darkerGrey,
  fontStyle: 'normal'
};

const paragraphVariants: TTypographyProps<TParagraphVariants> = {
  'medium-regular': {
    ...paragraphBaseProps
  },
  'medium-regular-blue': {
    ...paragraphBaseProps,
    color: Theme.palette.primary.ocean
    // textAlign: 'center'
  },
  'medium-bold': {
    ...paragraphBaseProps,
    fontWeight: EnumWeight.bold
  },
  'extrasmall-regular': {
    ...paragraphBaseProps,
    fontSize: Theme.fontSizes.body.xs,
    $lineHeight: EnumLineHeight.extraSmall
  },
  'extrasmall-medium': {
    ...paragraphBaseProps,
    fontSize: Theme.fontSizes.body.xs,
    $lineHeight: EnumLineHeight.extraSmall,
    fontWeight: EnumWeight.extraNormal
  },
  'extrasmall-regular-green': {
    ...paragraphBaseProps,
    fontSize: Theme.fontSizes.body.xs,
    $lineHeight: EnumLineHeight.extraSmall,
    color: Theme.palette.secondary.successGreen
  },
  'small-regular': {
    ...paragraphBaseProps,
    fontSize: `${Theme.fontSizes.body.s} !important`,
    $lineHeight: EnumLineHeight.small
  },
  error: {
    ...paragraphBaseProps,
    fontSize: Theme.fontSizes.body.s,
    $lineHeight: EnumLineHeight.small,
    color: Theme.palette.secondary.errorPink
  },
  'small-regular-azur': {
    ...paragraphBaseProps,
    fontSize: Theme.fontSizes.body.s,
    $lineHeight: EnumLineHeight.small,
    color: Theme.palette.primary.azur
  },
  'small-bold': {
    ...paragraphBaseProps,
    fontSize: Theme.fontSizes.body.s,
    $lineHeight: EnumLineHeight.small,
    fontWeight: EnumWeight.bold
  },
  'large-regular': {
    ...paragraphBaseProps,
    fontSize: Theme.fontSizes.body.l,
    $lineHeight: EnumLineHeight.large
  },
  'large-regular-blue': {
    ...paragraphBaseProps,
    fontSize: Theme.fontSizes.body.l,
    $lineHeight: EnumLineHeight.large,
    color: Theme.palette.primary.ocean
  },
  'large-bold': {
    ...paragraphBaseProps,
    fontSize: Theme.fontSizes.body.l,
    fontWeight: EnumWeight.bold,
    $lineHeight: EnumLineHeight.large
  }
};

export default function Paragraph({
  variant = 'small-regular',
  children
}: {
  variant?: TParagraphVariants;
  children: ReactNode;
}) {
  const paragraphProps = paragraphVariants[variant];
  return <P {...paragraphProps}>{children}</P>;
}
