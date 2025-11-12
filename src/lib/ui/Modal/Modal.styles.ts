import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { EnumWeight } from '@app/lib/types';
import styled from 'styled-components';
import { H4 } from '../Global';
import IconButton from '../IconButton';
import type { ModalType } from './Modal.types';

export const StyledDialog = styled(Dialog)<{
  $modalType: ModalType;
  $width?: string;
}>`
  display: flex;
  flex-direction: column;

  .MuiPaper-root {
    position: relative;
    border-radius: 8px;
    width: ${(props) => props.$width || '500px'};
    gap: 10px;
    max-height: 80vh;
    overflow: hidden;
    max-width: ${() => '100%'};
  }

  .MuiDialog-container {
    height: 100%;
  }

  .MuiBackdrop-root {
    opacity: 0.25 !important;
    background-color: ${(props) => props.theme.palette.primary.darkerGrey};
    backface-visibility: hidden;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    height: 100vh;
    overflow-y: auto;
  }

  @media ((max-width: ${(props) => props.theme.breakpoints.xxs}px)) {
    overflow-y: auto;

    .MuiPaper-root {
      gap: 0px;
      max-height: fit-content;
      overflow-y: hidden;
    }

    .MuiDialog-container {
      height: unset;
    }
  }

  @media ((max-height: 600px) and 
  (max-width: ${(props) => props.theme.breakpoints.xs}px)) {
    overflow-y: auto;

    .MuiPaper-root {
      max-height: fit-content;
      overflow-y: hidden;
    }

    .MuiDialog-container {
      height: unset;
    }
  }

  @media ((max-width: ${(props) => props.theme.breakpoints.xs}px) 
  and (min-height: 480px)) {
    .MuiDialog-container {
      height: 100%;
    }
  }
`;

export const DialogHeaderContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 16px 24px 0px 24px;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background: ${(props) => props.theme.palette.primary.snow};
  z-index: 10;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    gap: 0px;
    padding: 10px 20px 0px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.xxs}px) {
    gap: 0px;
    padding: 10px 10px 5px 15px;
  }
`;

export const StyledHeaderTitle = styled(H4)`
  color: ${(props) => props.theme.palette.primary.ocean};
  margin: 0;
  font-size: 18px;
  font-weight: ${EnumWeight.bold};
  line-height: 26px;
  font-family: ${(props) => props.theme.fontFamilies.Lora};
`;

export const DialogBody = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 10px 24px 0px;
  gap: 15px;
  overflow-y: auto;
  flex: 1;

  .form-wrapper-label {
    line-height: 22px;
    font-weight: ${EnumWeight.bold};
    font-size: ${(props) => props.theme.fontSizes.body.l};
    color: ${(props) => props.theme.palette.primary.darkerGrey};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    gap: 10px;
    margin: 15px 20px;
  }

  @media ((max-width: ${(props) => props.theme.breakpoints.xs}px) 
  and (max-height: 480px)) {
    margin: 10px 20px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.xxs}px) {
    gap: 10px;
    margin: 10px 15px;
  }
`;

/* prettier-ignore */
export const DialogFooter = styled(Box)<{justify?: string}>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:  ${(props) => props.justify || "end"};;
  gap: 15px;
  padding: 15px 24px 24px 0px;
  font-size: ${(props) => props.theme.fontSizes.body.s};
  position: sticky;
  bottom: 0;
  background: ${(props) => props.theme.palette.primary.snow};
  z-index: 10;

  button {
    &:focus {
      outline: 2px solid ${(props) => props.theme.palette.primary.ocean};
    }
    white-space: nowrap;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    padding: 10px 20px 14px 0px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.xs}px) and (max-height: 480px) { padding: 0px 15px 10px 15px; }

  @media (max-width: ${(props) => props.theme.breakpoints.xxs}px) and (min-height: 480px) { padding: 0px 15px 10px 0px; }

  @media (max-width: ${(props) => props.theme.breakpoints.xxs}px) {
    justify-content: center;
  }
`;

export const CloseButton = styled(IconButton)`
  justify-content: flex-end;
  padding: 0 !important;
`;

export const StyledDividingLine = styled(Box)`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.palette.secondary.lightGreen};
  flex-shrink: 0;
`;

export const StyledTitle = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;
