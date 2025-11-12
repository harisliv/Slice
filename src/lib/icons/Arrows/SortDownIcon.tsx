import { Theme } from '@app/lib/general';
import type { IIconProps } from '@app/lib/types';
import type { FC } from 'react';

const SortDownIcon: FC<IIconProps> = ({
  fill = Theme.palette.primary.azur,
  size = 20
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.9533 7.8573H7.04655C6.49748 7.8573 6.22317 8.52177 6.61042 8.90902L9.56783 11.9624C9.68568 12.0825 9.82407 12.1428 10.0004 12.1428C10.1578 12.1428 10.3156 12.0824 10.4363 11.9618L13.3893 8.90837C13.777 8.52244 13.5024 7.8573 12.9533 7.8573Z"
      fill={fill}
    />
  </svg>
);

export default SortDownIcon;
