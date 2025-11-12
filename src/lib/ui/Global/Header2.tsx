import { Theme } from '@app/lib/general';
import type { ITypography, TTypographyProps } from '@app/lib/types';
import { EnumWeight } from '@app/lib/types';
import { H2 } from './Global.styles';
import type { ReactNode } from 'react';

type THeader2Variants = 'default' | 'bold' | 'bold-pink';

const headerBaseProps: ITypography = {
  color: Theme.palette.primary.ocean,
  fontFamily: Theme.fontFamilies.Lora,
  fontSize: Theme.fontSizes.headings.h2,
  fontStyle: 'normal',
  fontWeight: EnumWeight.normal
};

const headerVariants: TTypographyProps<THeader2Variants> = {
  default: {
    ...headerBaseProps
  },
  bold: {
    ...headerBaseProps,
    fontWeight: EnumWeight.bold
  },
  'bold-pink': {
    ...headerBaseProps,
    fontWeight: EnumWeight.bold,
    color: Theme.palette.errorPink.errorPink80
  }
};

export default function Header2({
  variant = 'default',
  children
}: {
  variant?: THeader2Variants;
  children: ReactNode;
}) {
  const headerProps = headerVariants[variant];
  return <H2 {...headerProps}>{children}</H2>;
}
