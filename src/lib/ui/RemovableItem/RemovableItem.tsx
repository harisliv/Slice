import { IconButton } from "@mui/material";
import { StyledItemContainer } from "./RemovableItem.styles";
import { ClearIcon, TrashBinIcon } from "@app/lib/icons";
import { Paragraph } from "../Global";
import { Theme } from "@app/lib/general";

type RemovableItemProps = {
  label: string;
  icon?: "clear" | "trash";
  disabled?: boolean;
  onRemove?: () => void;
};

export default function RemovableItem({
  label,
  onRemove,
  icon = "clear",
  disabled = false,
}: RemovableItemProps) {
  return (
    <StyledItemContainer elevation={1}>
      <Paragraph variant="small-bold">{label}</Paragraph>
      {onRemove && (
        <IconButton
          size="small"
          color="error"
          aria-label="remove"
          onClick={onRemove}
          disabled={disabled}
        >
          {icon === "clear" ? (
            <ClearIcon
              {...(disabled && {
                fill: Theme.palette.controlsAndStatus.disabled,
              })}
            />
          ) : (
            <TrashBinIcon
              {...(disabled && {
                fill: Theme.palette.controlsAndStatus.disabled,
              })}
            />
          )}
        </IconButton>
      )}
    </StyledItemContainer>
  );
}
