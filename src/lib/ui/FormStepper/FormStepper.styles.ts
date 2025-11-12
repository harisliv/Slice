import { Box, Button, Step, StepLabel } from "@mui/material";
import type { DefaultTheme } from "styled-components";
import styled from "styled-components";
import { P } from "@app/lib/ui";

export const StepperContainer = styled(Box)<{ $isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$isMobile ? "10px" : "48px")};
`;

export const StepWrapper = styled(Box)<{
  active?: boolean;
  completed?: boolean;
}>`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ active }) => (active ? "#e3f2fd" : "#f5f5f5")};
  border-left: 4px solid
    ${({ completed, active }) =>
      completed ? "#4caf50" : active ? "#2196f3" : "#bdbdbd"};
`;

const getStepCircleBgColor = (
  completed?: boolean,
  active?: boolean,
  theme?: DefaultTheme,
) => {
  if (!theme) {
    return null;
  }
  if (completed) {
    return theme.palette.secondary.successGreen;
  } else if (active) {
    return theme.palette.primary.azur;
  } else {
    return "#BBBBBC";
  }
};

export const StepCircle = styled(Box)<{
  active?: boolean;
  completed?: boolean;
}>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${({ completed, active, theme }) =>
    getStepCircleBgColor(completed, active, theme)};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export const StyledStep = styled(Step)`
  + .MuiStepConnector-root {
    margin-left: 18px;
    height: 32px;
    position: relative;

    & .MuiStepConnector-line {
      border-color: ${({ theme }) => theme.palette.secondary.darkGrey};
    }

    span {
      position: absolute;
      min-height: 50px;
      top: -100%;
      bottom: -100%;
    }
  }
`;

export const StyledStepButton = styled(Button)`
  && {
    z-index: 1;
    padding: 0;
    text-transform: inherit;
    transition: none;
    outline: 2px solid transparent;
    border-radius: 2px;
    /* :hover {
      background-color: transparent;
    } */
    :focus {
      outline: 2px solid ${(props) => props.theme.palette.primary.ocean};
      background-color: transparent;
    }
  }
`;

export const StyledStepLabel = styled(StepLabel)<{
  $completed: boolean;
  $disabled: boolean;
  $active: boolean;
  $clickable: boolean;
}>`
  font-size: 16px;
  padding: 0 !important;
  font-family: ${(props) => props.theme.fontFamilies.Roboto};

  .MuiStepLabel-label {
    font-size: 18px;

    text-align: left;
    font-style: normal !important;
    color: ${({ theme }) => theme.palette.primary.darkerGrey} !important;
    font-weight: 400 !important;
    margin-left: "10px";
    p {
      font-family: ${({ theme }) => theme.fontFamilies.Roboto};
      font-size: 13px;
      margin: 0;
      margin-left: "0px";
    }
    cursor: ${(props) => (props.$clickable ? "pointer" : "cursor")};
    ${({ $completed, $disabled, $active, theme }) => {
      if ($disabled) {
        return `color:
              ${theme.palette.controlsAndStatus.disabled} !important`;
      } else if ($completed && $active) {
        return `
            font-weight: 700 !important;
            p {
              color:  ${theme.palette.secondary.successGreen};
            }`;
      } else if ($completed) {
        return `
            p {
              color:  ${theme.palette.secondary.successGreen};
            }
        `;
      } else if ($active) {
        return `
          font-weight: 700 !important;
        `;
      }
      return ""; // Default return value
    }}
  }

  &:focus-visible {
    outline: ${(props) => props.theme.palette.primary.ocean} solid 2px;
    outline-offset: 4px;
    border-radius: 2px;
    margin-right: 10px;
  }

  svg {
    margin: -4px;
    margin-right: -2px;
    path {
      fill: ${({ theme, $disabled }) =>
        $disabled
          ? theme.palette.controlsAndStatus.disabled
          : theme.palette.primary.darkerGrey};
    }
  }
`;

export const StyledStepIcon = styled(P)<{
  $active: boolean;
  $completed: boolean;
  $disabled: boolean;
  $clickable: boolean;
}>`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.$clickable ? "pointer" : "cursor")};
  color: ${({ $active, $disabled, theme, $completed }) => {
    if ($disabled) {
      return `${theme.palette.controlsAndStatus.disabled}`;
    } else if ($active || $completed) {
      return "white";
    } else {
      return `${theme.palette.primary.azur}`;
    }
  }};

  background-color: ${({ $active, $disabled, $completed, theme }) => {
    if ($disabled) {
      return "white";
    } else if ($completed) {
      return `${theme.palette.secondary.successGreen}`;
    } else if ($active) {
      return `${theme.palette.primary.azur}`;
    } else {
      return "white";
    }
  }};

  outline: ${({ $active }) => {
    if ($active) {
      return `1px solid`;
    }
    return "none";
  }};

  outline-color: ${({ $active, $completed, $disabled, theme }) => {
    if ($disabled) {
      return `${theme.palette.controlsAndStatus.disabled}`;
    } else if ($completed) {
      return `${theme.palette.secondary.successGreen}`;
    } else if ($active) {
      return `${theme.palette.primary.azur}`;
    } else {
      return "transparent"; // Default return value
    }
  }};

  border: ${({ $completed, $disabled, theme, $active }) => {
    if ($disabled) {
      return `1px solid ${theme.palette.controlsAndStatus.disabled}`;
    } else if ($completed && !$active) {
      return `2px solid ${theme.palette.secondary.successGreen}`;
    } else if ($active) {
      return "2px solid white";
    } else {
      return `1px solid ${theme.palette.primary.azur}`;
    }
  }};
  border-radius: 50%;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  margin: 0;
  font-family: ${({ theme }) => theme.fontFamilies.Roboto};
  svg {
    path {
      fill: white;
    }
  }
`;

export const VerticalLine = styled(Box)`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.palette.darkGrey.darkGrey30};
`;

export const MobileStepContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: center;
  margin-left: 50px;
`;

export const MobileArrowsContainer = styled(Box)`
  display: flex;
  cursor: pointer;
`;

// TODO replace with Paragraph component
export const MobileStepText = styled(P)`
  margin: 0;
  padding: 0;
  color: ${(props) => props.theme.palette.primary.azur};
  font-family: ${(props) => props.theme.fontFamilies.Roboto};
  font-size: ${(props) => props.theme.fontSizes.body.m};
  line-height: 19px;
`;

export const DividingLine = styled(Box)`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.palette.darkerGrey.darkerGrey36};
`;
