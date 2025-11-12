import type { Theme } from '@app/lib/general';
import type { IIconProps, TagStatus } from '@app/lib/types';

export interface CustomTagProps {
  variant?: string | null;
}

export type CustomTagVariant = {
  [K in TagStatus]: {
    backgroundColor: keyof (typeof Theme)['palette']['secondary'];
    textColor: string;
    Icon: React.FC<IIconProps>;
    label: string;
  };
};
