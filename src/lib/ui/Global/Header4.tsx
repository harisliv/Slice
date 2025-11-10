import { Theme } from '@app/lib/general';
import type { ITypography, TTypographyProps } from '@app/lib/types';
import { EnumWeight } from '@app/lib/types';
import { H4 } from './Global.styles';
import type { ReactNode } from 'react';

type THeader4Variants = 'default' | 'lora';

const headerBaseProps: ITypography = {
  color: Theme.palette.primary.darkerGrey,
  fontFamily: Theme.fontFamilies.Roboto,
  fontSize: Theme.fontSizes.headings.h4,
  fontStyle: 'normal',
  fontWeight: EnumWeight.bold,
  $lineHeight: '28px'
};

const headerVariants: TTypographyProps<THeader4Variants> = {
  default: {
    ...headerBaseProps
  },
  lora: {
    ...headerBaseProps,
    fontFamily: Theme.fontFamilies.Lora
  }
};

export default function Header4({
  variant = 'default',
  children
}: {
  variant?: THeader4Variants;
  children: ReactNode;
}) {
  const headerProps = headerVariants[variant];
  return <H4 {...headerProps}>{children}</H4>;
}
