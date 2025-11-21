import type { FC } from 'react';
import { Theme } from '@app/lib/general';
import type { IIconProps } from '@app/lib/types';

const LogoIcon: FC<IIconProps> = ({ fill = Theme.palette.primary.azur }) => (
  <svg
    width="35"
    height="28"
    viewBox="0 0 35 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-testid={'mainLogo.icon'}
  >
    {/* Left page */}
    <path
      d="M2 3C2 2.44772 2.44772 2 3 2H12C13.1046 2 14 2.89543 14 4V24C14 23.1046 13.1046 22 12 22H3C2.44772 22 2 21.5523 2 21V3Z"
      fill={fill}
      stroke={fill}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Right page */}
    <path
      d="M33 3C33 2.44772 32.5523 2 32 2H23C21.8954 2 21 2.89543 21 4V24C21 23.1046 21.8954 22 23 22H32C32.5523 22 33 21.5523 33 21V3Z"
      fill={fill}
      stroke={fill}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Book spine/binding */}
    <path
      d="M17.5 2L17.5 24"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Left page lines */}
    <line
      x1="5"
      y1="7"
      x2="12"
      y2="7"
      stroke="white"
      strokeWidth="0.8"
      opacity="0.6"
    />
    <line
      x1="5"
      y1="10"
      x2="12"
      y2="10"
      stroke="white"
      strokeWidth="0.8"
      opacity="0.6"
    />
    <line
      x1="5"
      y1="13"
      x2="11"
      y2="13"
      stroke="white"
      strokeWidth="0.8"
      opacity="0.6"
    />
    {/* Right page lines */}
    <line
      x1="24"
      y1="7"
      x2="30"
      y2="7"
      stroke="white"
      strokeWidth="0.8"
      opacity="0.6"
    />
    <line
      x1="24"
      y1="10"
      x2="30"
      y2="10"
      stroke="white"
      strokeWidth="0.8"
      opacity="0.6"
    />
    <line
      x1="24"
      y1="13"
      x2="29"
      y2="13"
      stroke="white"
      strokeWidth="0.8"
      opacity="0.6"
    />
    {/* Digital screen effect */}
    <rect x="3" y="16" width="9" height="6" fill="white" opacity="0.2" rx="1" />
    <rect
      x="23"
      y="16"
      width="9"
      height="6"
      fill="white"
      opacity="0.2"
      rx="1"
    />
  </svg>
);

export default LogoIcon;
