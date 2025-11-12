import type { FC } from "react";
import { Theme } from "@app/lib/general";
import type { IIconProps } from "@app/lib/types";

const InfoCircleIcon: FC<IIconProps> = ({
  fill = Theme.palette.primary.azur,
}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.0072 13.7143C9.53385 13.7143 9.15009 13.3305 9.15009 12.8572L9.15009 10C9.15009 9.52662 9.53385 9.14287 10.0072 9.14287C10.4806 9.14287 10.8644 9.52662 10.8644 10V12.8572C10.8644 13.3305 10.4806 13.7143 10.0072 13.7143Z"
      fill={fill}
    />
    <path
      d="M10.0072 8C10.4806 8 10.8644 7.61624 10.8644 7.14286C10.8644 6.66947 10.4806 6.28571 10.0072 6.28571H10.0001C9.52671 6.28571 9.14295 6.66947 9.14295 7.14286C9.14295 7.61624 9.52671 8 10.0001 8H10.0072Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM10 3.71429C6.5285 3.71429 3.71429 6.5285 3.71429 10C3.71429 13.4715 6.5285 16.2857 10 16.2857C13.4715 16.2857 16.2857 13.4715 16.2857 10C16.2857 6.5285 13.4715 3.71429 10 3.71429Z"
      fill={fill}
    />
  </svg>
);

export default InfoCircleIcon;
