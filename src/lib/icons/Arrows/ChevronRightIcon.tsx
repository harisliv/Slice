import { Theme } from "@app/lib/general";
import type { IIconProps } from "@app/lib/types";
import type { FC } from "react";

const ChevronRightIcon: FC<IIconProps> = ({
  fill = Theme.palette.primary.snow,
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
      d="M6.91079 15.5892C6.58535 15.2638 6.58535 14.7362 6.91079 14.4107L11.3215 9.99998L6.91079 5.58923C6.58535 5.2638 6.58535 4.73616 6.91079 4.41072C7.23622 4.08529 7.76386 4.08529 8.0893 4.41072L13.0893 9.41072C13.4147 9.73616 13.4147 10.2638 13.0893 10.5892L8.0893 15.5892C7.76386 15.9147 7.23622 15.9147 6.91079 15.5892Z"
      fill={fill}
    />
  </svg>
);

export default ChevronRightIcon;
