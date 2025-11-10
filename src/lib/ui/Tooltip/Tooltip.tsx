import React from 'react';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import { Theme } from '@app/lib/general';
import { Box } from '@mui/material';

interface Props {
  title: React.ReactNode;
  children: React.ReactElement;
  placement?: 'bottom' | 'top' | 'left' | 'right';
}

export default function CustomTooltip({
  title,
  children,
  placement = 'top'
}: Props) {
  const theme = useTheme();

  const popperSx = {
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: Theme.palette.background.lightGrey,
      color: Theme.palette.primary.darkerGrey,
      border: `1px solid ${Theme.palette.secondary.darkerGrey36}`,
      fontSize: 13,
      padding: '5px'
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.white,
      '&::before': {
        boxSizing: 'border-box',
        border: `1px solid ${Theme.palette.secondary.darkerGrey36}`,
        backgroundColor: theme.palette.common.white
      }
    }
  } as const;

  return (
    <Tooltip
      title={title}
      arrow
      placement={placement}
      slotProps={{
        popper: {
          sx: popperSx
        }
      }}
    >
      <Box component="span" sx={{ cursor: 'pointer', display: 'inline-flex' }}>
        {children}
      </Box>
    </Tooltip>
  );
}
