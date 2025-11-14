import type { FC } from 'react';
import { Theme } from '@app/lib/general';
import type { IIconProps } from '@app/lib/types';

const LogoIcon: FC<IIconProps> = ({ fill = Theme.palette.primary.azur }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="64"
    height="64"
    fill={fill}
  >
    <path
      d="M3 4C3 3.44772 3.44772 3 4 3H10C11.1046 3 12 3.89543 12 5V19C12 17.8954 11.1046 17 10 17H4C3.44772 17 3 16.5523 3 16V4Z"
      fill="#fff"
      stroke="#000"
      stroke-width="2"
    />
    <path
      d="M21 4C21 3.44772 20.5523 3 20 3H14C12.8954 3 12 3.89543 12 5V19C12 17.8954 12.8954 17 14 17H20C20.5523 17 21 16.5523 21 16V4Z"
      fill="#fff"
      stroke="#000"
      stroke-width="2"
    />
    <path d="M12 5L12 19" stroke="#000" stroke-width="2" />
  </svg>
);

export default LogoIcon;
