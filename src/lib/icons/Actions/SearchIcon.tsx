import type { FC } from 'react';
import type { IIconProps } from '@app/lib/types';
import { Theme } from '@app/lib/general';

const SearchIcon: FC<IIconProps> = ({
  fill = Theme.palette.primary.darkerGrey
}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.6941 14.8255C12.4624 15.8108 10.9 16.4 9.2 16.4C5.22355 16.4 2 13.1764 2 9.2C2 5.22355 5.22355 2 9.2 2C13.1764 2 16.4 5.22355 16.4 9.2C16.4 10.9 15.8108 12.4624 14.8255 13.6942L17.7656 16.6343C18.078 16.9467 18.078 17.4532 17.7656 17.7657C17.4532 18.0781 16.9467 18.0781 16.6342 17.7657L13.6941 14.8255ZM3.6 9.2C3.6 6.1072 6.1072 3.6 9.2 3.6C12.2928 3.6 14.8 6.1072 14.8 9.2C14.8 10.7086 14.2034 12.0779 13.2334 13.0848C13.2059 13.106 13.1794 13.1291 13.1542 13.1543C13.1291 13.1795 13.1059 13.2059 13.0848 13.2334C12.0779 14.2035 10.7086 14.8 9.2 14.8C6.1072 14.8 3.6 12.2928 3.6 9.2Z"
      fill={fill}
    />
  </svg>
);

export default SearchIcon;
