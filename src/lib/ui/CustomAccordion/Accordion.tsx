import {
  Accordion as CustomAccordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Stack,
  type AccordionProps
} from '@mui/material';
import { Theme } from '@app/lib/general';
import { ChevronDownIcon, TrashBinIcon } from '@app/lib/icons';
import { CustomTag, Header3 } from '@app/lib/ui';
import type { ReactNode } from 'react';

interface CustomAccordionProps extends AccordionProps {
  title: string;
  onActionClick: () => void;
  panelContent?: ReactNode;
  withDelete?: boolean;
  tagStatus?: string | null;
}

export default function Accordion({
  title,
  children,
  onActionClick,
  panelContent,
  withDelete,
  tagStatus = null,
  ...props
}: CustomAccordionProps) {
  return (
    <CustomAccordion {...props} sx={{ wordBreak: 'break-word' }}>
      <AccordionSummary
        expandIcon={<ChevronDownIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            width: '100%',
            paddingRight: 2,
            borderRight: `1px solid ${Theme.palette.controlsAndStatus.disabled}`,
            marginRight: 2
          }}
        >
          <Header3 variant="bold">{title}</Header3>
          <Stack direction={'row'} spacing={1}>
            <CustomTag variant={tagStatus} />
            {panelContent}
          </Stack>
          {withDelete && (
            <Box
              sx={{ cursor: 'pointer', height: '20px', width: '20px' }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onActionClick();
              }}
            >
              <TrashBinIcon />
            </Box>
          )}
        </Stack>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </CustomAccordion>
  );
}
