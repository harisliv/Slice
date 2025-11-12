import { Box, ListItem } from '@mui/material';
import { styled } from 'styled-components';

export const StyledFooterListItem = styled(ListItem)`
  position: sticky;
  bottom: 0;
  background-color: ${(props) => props.theme.palette.primary.snow};
  border-top: 1px solid ${(props) => props.theme.palette.background.lightGrey};
  z-index: 1;
  &.MuiListItem-root {
    position: sticky;
    padding: 0;
  }
`;

export const StyledFooterBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding: 10px;
`;
