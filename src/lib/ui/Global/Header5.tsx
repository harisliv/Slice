import { Theme } from '@app/lib/general';
import type { ITypography, TTypographyProps } from '@app/lib/types';
import { EnumWeight } from '@app/lib/types';
import { H5 } from './Global.styles';
import type { ReactNode } from 'react';

type THeader5Variants = 'default';

const headerBaseProps: ITypography = {
  color: Theme.palette.primary.snow,
  fontFamily: Theme.fontFamilies.Lora,
  fontSize: Theme.fontSizes.headings.h5,
  fontStyle: 'normal',
  fontWeight: EnumWeight.bold,
  $lineHeight: '28px',
  $textTransform: 'uppercase'
};

const headerVariants: TTypographyProps<THeader5Variants> = {
  default: {
    ...headerBaseProps
  }
};

export default function Header5({
  variant = 'default',
  children
}: {
  variant?: THeader5Variants;
  children: ReactNode;
}) {
  const headerProps = headerVariants[variant];
  return <H5 {...headerProps}>{children}</H5>;
}
