import type { FC } from "react";
import type { IIconProps } from "@app/lib/types";
import { Theme } from "@app/lib/general";

const SortUpIcon: FC<IIconProps> = ({
  fill = Theme.palette.primary.azur,
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.04666 12.1427L12.9534 12.1427C13.5025 12.1427 13.7768 11.4782 13.3896 11.091L10.4322 8.03759C10.3143 7.91751 10.1759 7.85724 9.99961 7.85724C9.84218 7.85724 9.68445 7.91758 9.56369 8.03824L6.61075 11.0916C6.22305 11.4776 6.49759 12.1427 7.04666 12.1427Z"
      fill={fill}
    />
  </svg>
);

export default SortUpIcon;
