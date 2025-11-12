import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput
} from '@mui/material';
import { EnumWeight } from '@app/lib/types';
import styled from 'styled-components';
import SelectBase from '../SelectBase';

export const StyledInputLabel = styled(InputLabel)`
  &&&& {
    margin: 0;
    padding: 0;
    top: -3px;
    font-size: ${(props) => props.theme.fontSizes.body.s};

    &.Mui-error {
      color: ${(props) => props.theme.palette.secondary.errorPink} !important;
    }
    &.Mui-focused,
    &.MuiInputLabel-shrink {
      margin: 0px;
      padding: 4px;
      top: -1px;
    }
    .MuiFormLabel-asterisk {
      color: ${(props) => props.theme.palette.secondary.errorPink};
    }
  }
`;

export const StyledFormControl = styled(FormControl)`
  && {
    .MuiFormLabel-root {
      color: ${(props) => props.theme.palette.primary.darkerGrey};
      font-size: ${(props) => props.theme.fontSizes.body.m};
      font-weight: ${EnumWeight.normal};
      line-height: 20px;
      padding: 0px 8px 0px 8px;

      &.MuiInputLabel-shrink {
        color: ${(props) => props.theme.palette.primary.azur} !important;
        background-color: white;
        color: ${(props) => props.theme.palette.primary.azur};
      }

      &.Mui-disabled,
      &.Mui-disabled * {
        color: ${(props) =>
          props.theme.palette.controlsAndStatus.disabled} !important;
      }
    }
  }
`;

export const StyledSelect = styled(SelectBase)`
  && {
    .MuiSelect-select {
      display: flex;
      align-items: center;
      min-height: 48px;
      padding-top: 0;
      padding-bottom: 0;
      font-size: ${(props) => props.theme.fontSizes.body.s};
      border: none !important;
      > span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        max-width: 100%;
        font-size: inherit;
      }
    }

    .Select-NoOptions-container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding-top: 15px;
      padding-bottom: 15px;
    }

    .Select-NoOptions-container > span:first-child {
      font-family: ${(props) => props.theme.fontFamilies.Roboto};
      font-style: normal;
      font-weight: ${EnumWeight.bold};
      font-size: ${(props) => props.theme.fontSizes.body.l};
      line-height: 20px;
      color: ${(props) => props.theme.palette.primary.ocean};
    }

    .Select-NoOptions-container > span:nth-child(2) {
      font-family: ${(props) => props.theme.fontFamilies.Roboto};
      font-style: normal;
      font-weight: ${EnumWeight.normal};
      font-size: ${(props) => props.theme.fontSizes.body.m};
      line-height: 20px;
    }
    .MuiSelect-select.Mui-disabled {
      color: ${(props) => props.theme.palette.controlsAndStatus.disabled};
      -webkit-text-fill-color: ${(props) =>
        props.theme.palette.controlsAndStatus.disabled}; /* Safari/Chrome */
    }

    .MuiSelect-icon.Mui-disabled {
      color: ${(props) => props.theme.palette.controlsAndStatus.disabled};
    }
  }
`;

export const StyledInput = styled(OutlinedInput)<{ $borderless?: boolean }>`
  && {
    .MuiOutlinedInput-notchedOutline {
      display: none;
    }

    border: 1px solid ${(props) => props.theme.palette.primary.azur};
    border-radius: 4px;

    &.Mui-focused {
      border: 2px solid ${(props) => props.theme.palette.primary.ocean};
    }

    &.Mui-error {
      border: 1px solid ${(props) => props.theme.palette.secondary.errorPink};
    }

    &.Mui-error.Mui-focused {
      border: 2px solid ${(props) => props.theme.palette.secondary.errorPink};
    }

    &.Mui-disabled {
      border: 1px solid ${(p) => p.theme.palette.controlsAndStatus.disabled};
      border-radius: 4px;
      background: ${(p) => p.theme.palette.primary.snow};

      .MuiOutlinedInput-input {
        color: ${(p) => p.theme.palette.controlsAndStatus.disabled};
        -webkit-text-fill-color: ${(p) =>
          p.theme.palette.controlsAndStatus.disabled};
      }
    }

    ${(props) =>
      props.$borderless &&
      `
        border: none;
        background: transparent;
        box-shadow: none;
      `}
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  && {
    font-style: normal;
    font-weight: ${EnumWeight.normal};
    font-size: ${(props) => props.theme.fontSizes.body.m};
    color: ${(props) => props.theme.palette.primary.darkerGrey};
    line-height: 20px;
    background-color: ${(props) => props.theme.palette.primary.snow};

    &:last-child {
      margin-bottom: 10px;
    }

    .optionStroke {
      display: none;
    }

    .MuiTouchRipple-child {
      background-color: ${(props) => props.theme.palette.background.azur4};
    }

    &.Mui-selected {
      background-color: transparent;

      .optionStroke {
        display: inline;
        height: 20px;
        padding-top: 1px;
        padding-left: 5px;
        & > svg {
          width: 16px;
          height: 16px;
          fill: ${(props) => props.theme.palette.secondary.lightGreen};
        }
      }
    }

    &:focus {
      border: ${(props) => props.theme.palette.primary.ocean} solid 2px;
      border-radius: 2px;
      background-color: ${(props) => props.theme.palette.primary.snow};
    }

    &:hover {
      background-color: ${(props) => props.theme.palette.background.azur8};
    }
  }
`;

export const StyledFormHelperText = styled(FormHelperText)`
  && {
    margin-top: 3px;
    margin-left: 0;
    font-size: ${(props) => props.theme.fontSizes.body.xs};
    color: ${(props) => props.theme.palette.primary.darkerGrey};
  }
`;
