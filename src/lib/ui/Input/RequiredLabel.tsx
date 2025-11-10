import { Stack } from '@mui/material';
import type { Theme } from '@app/lib/general';
import {
  StyledRequiredLabelSpan,
  StyledRequiredLabelStar
} from './Input.styles';

// TODO fix active label color
export default function RequiredLabel({
  label,
  required,
  fontSize = 'l',
  id,
  startWithStar = false
}: {
  label: React.ReactNode;
  required?: boolean;
  fontSize?: keyof typeof Theme.fontSizes.body;
  id?: string;
  startWithStar?: boolean;
}) {
  if (required) {
    return (
      <Stack spacing={0.5} direction="row">
        {startWithStar && <StyledRequiredLabelStar>*</StyledRequiredLabelStar>}
        <StyledRequiredLabelSpan $fontSize={fontSize} id={id}>
          {label}
        </StyledRequiredLabelSpan>
        {!startWithStar && <StyledRequiredLabelStar>*</StyledRequiredLabelStar>}
      </Stack>
    );
  }
  return (
    <StyledRequiredLabelSpan $fontSize={fontSize} id={id}>
      {label}
    </StyledRequiredLabelSpan>
  );
}
