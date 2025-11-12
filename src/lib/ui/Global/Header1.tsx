import { Theme } from '@app/lib/general';
import type { ITypography, TTypographyProps } from '@app/lib/types';
import { EnumWeight } from '@app/lib/types';
import { H1 } from './Global.styles';
import type { ReactNode } from 'react';

type THeader1Variants = 'default';

const headerBaseProps: ITypography = {
  color: Theme.palette.primary.ocean,
  fontFamily: Theme.fontFamilies.Lora,
  fontSize: Theme.fontSizes.headings.h1,
  fontStyle: 'normal',
  fontWeight: EnumWeight.bold,
  $lineHeight: '36px'
};

const headerVariants: TTypographyProps<THeader1Variants> = {
  default: {
    ...headerBaseProps
  }
};

export default function Header1({
  variant = 'default',
  children
}: {
  variant?: THeader1Variants;
  children: ReactNode;
}) {
  const paragraphProps = headerVariants[variant];
  return <H1 {...paragraphProps}>{children}</H1>;
}
