import { Box } from "@mui/material";
import styled from "styled-components";
import { GenericContainer, H3 } from "../Global/Global.styles";
import { EnumWeight } from "@app/lib/types";

export const StyledH3 = styled(H3)``;

export const HeaderWrapper = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1200;
`;

export const StyledContentContainer = styled(GenericContainer)`
  height: 56px;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    padding: 0 10px;
  }
`;

export const StyledHeaderNav = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.palette.primary.ocean};
`;

export const StyledPageInfo = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0;
  svg {
    path {
      fill: ${(props) => props.theme.palette.primary.snow};
    }
    width: 32px;
    height: 32px;
  }
`;

export const InfoWrapper = styled(Box)`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const StyledMenuButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.palette.secondary.lightGreen};
    border-radius: 2px;
  }
`;

export const StyledPageName = styled(Box)`
  display: flex;
  align-items: flex-start;
  ${StyledH3} {
    margin: 0;
    line-height: normal;
    color: ${(props) => props.theme.palette.primary.snow};
    font-family: ${(props) => props.theme.fontFamilies.Lora};
    font-size: 16px;
    padding-right: 6px;
    margin-right: 6px;
    font-weight: ${EnumWeight.bold};
  }
`;

export const SpaceFiller = styled(Box)`
  flex-grow: 1;
  max-width: 72px;
`;

export const StyledNavItems = styled(Box)`
  display: flex;
  gap: 10px;
  height: 100%;

  & > *:not(:last-child) {
    position: relative;
    padding-right: 12px;

    &::after {
      content: "";
      position: absolute;
      right: 1px;
      top: 50%;
      transform: translateY(-50%);
      height: 30%;
      width: 1px;
      background-color: ${(props) => props.theme.palette.primary.snow};
    }
  }
`;

export const NavItemWrapper = styled(Box)`
  color: ${(props) => props.theme.palette.primary.snow};
  display: flex;
  margin: 3px 0px;
  justify-content: center;
  align-items: center;
`;

export const NavActionsWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    border-radius: 2px;
  }
  gap: 7px;
`;

export const StyledNavActionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: ${(props) => props.theme.palette.secondary.lightGreen};
  border: none;
  width: fit-content;
  padding: 3.5px;
  text-transform: uppercase;
  border-radius: 6px;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
    path {
      fill: ${(props) => props.theme.palette.primary.snow};
    }
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.palette.secondary.lightGreen};
    border-radius: 2px;
  }

  &:hover {
    background-color: transparent;
    color: ${(props) => props.theme.palette.secondary.lightGreen};
  }
`;

export const tooltipStyles = {
  "& .MuiTooltip-tooltip": {
    padding: "8px",
    alignItems: "center",
    gap: "8px",
    transition: "opacity 0.1s, visibility 0.1s, transform 0.1s",
    opacity: 1,
    visibility: "visible",
    backgroundColor: "#F5F7F6",
    color: "#424245",
    border: "0.5px solid #BBBBBC",
  },
  "& .MuiTooltip-arrow": {
    "&::before": {
      backgroundColor: "#F5F7F6",
      border: "0.5px solid #BBBBBC",
    },
  },
};
