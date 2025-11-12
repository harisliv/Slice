import { Box, Tab, Tabs } from '@mui/material';
import styled from 'styled-components';
import { EnumWeight } from '@app/lib/types';
import IconButton from '../IconButton';

export const StyledTabsWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const StyledTabs = styled(Tabs)`
  width: 100%;
  min-height: 0;
  margin: 0;
  .MuiTab-root {
    text-transform: none;
    color: ${(props) => props.theme.palette.primary.azur};
  }
`;

export const StyledTab = styled(Tab)`
  font-size: ${(props) => props.theme.fontSizes.body.m};
  color: ${(props) => props.theme.palette.primary.azur};
  min-height: 0;
  padding: 8px 16px;
  flex: 1;
  &.Mui-selected {
    font-weight: ${EnumWeight.extraNormal};
    border-bottom: 4px solid ${(props) => props.theme.palette.primary.azur};
  }
`;

export const StyledTabPanel = styled(Box)`
  padding: 24px 0;
  border-top: 1px solid ${(props) => props.theme.palette.primary.azur};
`;

export const StyledNavigationWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
`;
export const NavigationButton = styled(IconButton)`
  color: ${(props) => props.theme.palette.primary.azur};
`;
