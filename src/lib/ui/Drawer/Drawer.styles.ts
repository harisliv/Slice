import { Box, List } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import styled from "styled-components";

export const StyledDrawer = styled(Drawer)`
  &.MuiDrawer-root {
    z-index: 1000;
  }
  & .MuiDrawer-paper {
    display: flex;
    width: 250px;
    padding: 12px 0px 20px 0px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    flex-shrink: 0;
    border-radius: 0px;
    background-color: ${(props) => props.theme.palette.primary.ocean};
    box-shadow: 4px 0px 8px 4px rgba(25, 25, 112, 0.12);
    color: ${(props) => props.theme.palette.primary.snow};
    @media (max-width: ${(props) => props.theme.breakpoints.xxs}px) {
      width: 228px;
    }
  }

  .MuiBackdrop-root {
    opacity: 0.24 !important;
    background-color: ${(props) => props.theme.palette.primary.darkerGrey};
    backface-visibility: hidden;
  }
`;

export const InfoWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0px 12px;

  svg {
    path {
      fill: ${(props) => props.theme.palette.primary.snow};
    }
    width: 32px;
    height: 32px;
  }
`;

export const StyledNavItems = styled(List)`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  padding: 56px 4px 6px 4px !important;
`;

export const StyledListItemText = styled.span``;
