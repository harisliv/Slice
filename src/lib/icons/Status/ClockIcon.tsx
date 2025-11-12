import type { FC } from 'react';
import { Theme } from '@app/lib/general';
import type { IIconProps } from '@app/lib/types';

const ClockIcon: FC<IIconProps> = ({ fill = Theme.palette.primary.azur }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_19041_3957)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.50004 10C2.50004 5.85786 5.85791 2.5 10 2.5C14.1422 2.5 17.5 5.85786 17.5 10C17.5 14.1421 14.1422 17.5 10 17.5C5.85791 17.5 2.50004 14.1421 2.50004 10ZM10 0.833334C4.93743 0.833334 0.833374 4.93739 0.833374 10C0.833374 15.0626 4.93743 19.1667 10 19.1667C15.0627 19.1667 19.1667 15.0626 19.1667 10C19.1667 4.93739 15.0627 0.833334 10 0.833334ZM10.8334 5C10.8334 4.53976 10.4603 4.16667 10 4.16667C9.5398 4.16667 9.16671 4.53976 9.16671 5V10C9.16671 10.3156 9.34504 10.6042 9.62736 10.7454L12.9607 12.412C13.3723 12.6178 13.8729 12.451 14.0787 12.0393C14.2846 11.6277 14.1177 11.1271 13.7061 10.9213L10.8334 9.48497V5Z"
        fill={fill}
      />
    </g>
    <defs>
      <clipPath id="clip0_19041_3957">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default ClockIcon;
