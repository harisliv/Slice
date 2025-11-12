import type { FC } from "react";
import { ChevronDownIcon } from "@app/lib/icons";
import { StyledSelectBase, WrapperIcon } from "./SelectBase.styles";
import type { ISelectBase } from "@app/lib/types";
import { Theme } from "@app/lib/general";

const SelectBase: FC<ISelectBase> = ({
  className = "",
  disabled,
  labelId,
  ...props
}) => (
  <StyledSelectBase
    data-testid="selectBase"
    className={className}
    disabled={disabled}
    labelId={labelId}
    IconComponent={(iconProps) => (
      <WrapperIcon {...iconProps}>
        <ChevronDownIcon
          {...iconProps}
          fill={
            disabled
              ? Theme.palette.controlsAndStatus.disabled
              : Theme.palette.primary.azur
          }
        />
      </WrapperIcon>
    )}
    {...props}
  />
);

export default SelectBase;
