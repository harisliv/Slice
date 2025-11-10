import { Box, Snackbar } from '@mui/material';
import type { DefaultTheme } from 'styled-components';
import styled from 'styled-components';
import type { IToasterType } from './Toaster.types';
import { ToasterType } from './Toaster.types';
const getContentBorder = ({
  toastertype,
  theme
}: IToasterType & { theme: DefaultTheme }): string => {
  const color =
    toastertype === ToasterType.SUCCESS
      ? theme.palette.secondary.successGreen
      : theme.palette.secondary.errorPink;
  return `0.5px solid ${color}`;
};

const getButtonOutline = ({
  toastertype,
  theme
}: IToasterType & { theme: DefaultTheme }): string => {
  const color =
    toastertype === ToasterType.SUCCESS
      ? theme.palette.secondary.successGreen
      : theme.palette.secondary.errorPink;
  return `2px solid ${color}`;
};

const getContentBackgroundColor = ({
  toastertype,
  theme
}: IToasterType & { theme: DefaultTheme }): string => {
  return toastertype === ToasterType.SUCCESS
    ? theme.palette.successGreen.successGreen2
    : theme.palette.errorPink.errorPink2;
};

export const StyledToaster = styled(Snackbar)`
  &.MuiToaster-root {
    &.MuiToaster-anchorOriginTopRight {
      top: 62px;
      bottom: 16px !important;
    }
  }
`;

export const StyledToasterContent = styled(Box)<IToasterType>`
  position: relative;
  padding: 8px 16px;
  width: auto;
  max-width: 440px;
  box-shadow: 0px 4px 16px 8px rgba(25, 25, 112, 0.12);
  border-radius: 4px;
  border-width: 1px;
  border: ${getContentBorder};
  background-color: ${getContentBackgroundColor};
`;

export const ToasterBody = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: 'flex-start';
  justify-content: space-between;
  gap: 16px;
`;

export const IconAndTextWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: 'flex-start';
`;

export const StyledIconWrapper = styled(Box)`
  display: flex;
  justify-content: flex-start;
`;

export const StyledTextWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: auto;
`;

export const StyledTitle = styled.span`
  font-size: ${(props) => props.theme.fontSizes.body.l};
  color: ${(props) => props.theme.palette.primary.darkerGrey};
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
`;

export const CloseButtonWrapper = styled(Box)`
  display: flex;
  justify-content: flex-start;
`;

export const CloseButton = styled.button<IToasterType>`
  background-color: transparent;
  display: flex;
  justify-content: center;
  border: none;
  cursor: pointer;

  padding: 0;
  border-radius: 2px;
  &:focus-visible {
    outline: ${getButtonOutline};
  }
`;

export const CopyButton = styled.button`
  display: inline-flex;
  align-items: center;
  font-weight: 700;
  gap: 4px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  color: ${(props) => props.theme.palette.primary.azur};
  font-size: ${(props) => props.theme.fontSizes.body.l};
  line-height: inherit;
  text-decoration: underline;
  vertical-align: baseline;

  &:hover {
    color: ${(props) => props.theme.palette.controlsAndStatus.hoverBlue};
  }

  &:active {
    color: ${(props) => props.theme.palette.primary.ocean};
  }
`;
