import type { FC } from "react";

import { StyledChip } from "./Chip.styles";
import type { ChipProps } from "@mui/material";
import { ExitIcon } from "@app/lib/icons";

const Chip: FC<ChipProps> = ({ label, onDelete }) => (
  <StyledChip
    label={label}
    onDelete={onDelete}
    deleteIcon={
      <span
        className="UnSelectChips UnSelectChips-remove"
        data-testid={"unselect-chips-wrapper"}
      >
        <ExitIcon />
      </span>
    }
  ></StyledChip>
);

export default Chip;
