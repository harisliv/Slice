import { CustomAccordion } from "@app/lib/ui";
interface ClimateRelatedAlignmentTitleProps {
  title?: string;
  text?: string;
  onActionClick?: () => void;
  expanded?: boolean;
  isEditMode?: boolean;
}

export default function ClimateRelatedAlignmentTitle({
  title,
  text,
  onActionClick,
  expanded,
  isEditMode = true,
}: ClimateRelatedAlignmentTitleProps) {
  return (
    <CustomAccordion
      title={title ?? ""}
      onActionClick={onActionClick ?? (() => {})}
      expanded={expanded}
      withDelete={isEditMode}
    >
      {text ?? ""}
    </CustomAccordion>
  );
}
