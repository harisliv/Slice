import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { ExternalLinkIcon } from '@app/lib/icons';
import type { PdfLinkProps } from './PdfLink.types';
import { IconWrapper } from './PdfLink.styles';
import { Paragraph } from '../Global';

export default function PdfLink({ filename, url, size }: PdfLinkProps) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Link
        href={url}
        underline="always"
        target="_blank"
        rel="noopener noreferrer"
        color="primary"
        fontWeight={500}
        sx={{ fontSize: 16, display: 'flex', alignItems: 'center' }}
      >
        {filename}
        <IconWrapper>
          <ExternalLinkIcon />
        </IconWrapper>
      </Link>
      {size && <Paragraph variant="small-regular">({size})</Paragraph>}
    </Stack>
  );
}
