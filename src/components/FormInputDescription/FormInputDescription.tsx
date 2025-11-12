import { Stack } from '@mui/material';
import { Header4, RequiredLabel } from '@app/lib/ui';
import type { FormInputDescriptionProps } from '@app/types';
import { Paragraph } from '@app/lib/ui';

export default function FormInputDescription({
  title,
  subtitle,
  required
}: FormInputDescriptionProps) {
  return (
    <Stack spacing={1}>
      {title && (
        <Header4 variant="default">
          <RequiredLabel label={title} required={required} fontSize="l" />
        </Header4>
      )}
      {subtitle && <Paragraph>{subtitle}</Paragraph>}
    </Stack>
  );
}
