import { Theme } from "@app/lib/general";
import type { IIconProps } from "@app/lib/types";

export default function PlusIcon({
  fill = Theme.palette.primary.snow,
}: IIconProps) {
  return (
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
        d="M10 4C10.4142 4 10.75 4.33579 10.75 4.75V15.25C10.75 15.6642 10.4142 16 10 16C9.58579 16 9.25 15.6642 9.25 15.25V4.75C9.25 4.33579 9.58579 4 10 4Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 10C4 9.58579 4.33579 9.25 4.75 9.25H15.25C15.6642 9.25 16 9.58579 16 10C16 10.4142 15.6642 10.75 15.25 10.75H4.75C4.33579 10.75 4 10.4142 4 10Z"
        fill={fill}
      />
    </svg>
  );
}
