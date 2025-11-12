import { Theme } from '@app/lib/general';
import type { ITypography, TTypographyProps } from '@app/lib/types';
import { EnumWeight } from '@app/lib/types';
import { H3 } from './Global.styles';
import type { ReactNode } from 'react';

type THeader3Variants = 'default' | 'bold' | 'bold-pink' | 'bold-uppercase';

const headerBaseProps: ITypography = {
  color: Theme.palette.primary.ocean,
  fontFamily: Theme.fontFamilies.Lora,
  fontSize: Theme.fontSizes.headings.h3,
  fontStyle: 'normal',
  fontWeight: EnumWeight.normal
};

const headerVariants: TTypographyProps<THeader3Variants> = {
  default: {
    ...headerBaseProps
  },
  bold: {
    ...headerBaseProps,
    fontWeight: EnumWeight.bold
  },
  'bold-pink': {
    ...headerBaseProps,
    color: Theme.palette.secondary.errorPink,
    fontWeight: EnumWeight.bold
  },
  'bold-uppercase': {
    ...headerBaseProps,
    fontWeight: EnumWeight.bold,
    $textTransform: 'uppercase'
  }
};

export default function Header3({
  variant = 'default',
  children
}: {
  variant?: THeader3Variants;
  children: ReactNode;
}) {
  const headerProps = headerVariants[variant];
  return <H3 {...headerProps}>{children}</H3>;
}
