import type { CustomTagProps } from "./CustomTag.types";
import { getCustomTagVariant } from "./CustomTag.constants";
import {
  TagContainer,
  IconFrame,
  IconContainer,
  LabelText,
} from "./CustomTag.styles";
import type { TagStatus } from "@app/lib/types";

const isTagStatus = (status?: string | null): status is TagStatus =>
  [
    "SUBMITTED",
    "DRAFT",
    "CONCLUDED",
    "ACTIVE",
    "ACCOMPLISHED",
    "INACTIVE",
  ].includes(status ?? "");

export default function CustomTag({ variant }: CustomTagProps) {
  const upperCaseVariant = variant?.toUpperCase();
  if (!isTagStatus(upperCaseVariant)) return null;
  const { backgroundColor, textColor, Icon, label } =
    getCustomTagVariant(upperCaseVariant);
  return (
    <TagContainer $backgroundColor={backgroundColor}>
      <IconFrame>
        <IconContainer style={{ color: textColor }}>
          <Icon fill={textColor} />
        </IconContainer>
      </IconFrame>
      <LabelText $textColor={textColor}>{label}</LabelText>
    </TagContainer>
  );
}
