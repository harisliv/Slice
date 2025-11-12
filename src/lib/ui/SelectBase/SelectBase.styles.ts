import {
  Chip,
  FormControl,
  MenuItem as MaterialMenuItem,
  Select as MaterialSelect,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { animation } from "@app/lib/general";
import { EnumWeight } from "@app/lib/types";
import styled from "styled-components";

export const StyledFormControl = styled(FormControl)`
  && {
    .MuiFormLabel-root {
      color: ${(props) => props.theme.palette.primary.darkerGrey};
      font-size: ${(props) => props.theme.fontSizes.body.m};
      font-weight: ${EnumWeight.normal};
      line-height: 20px;
      padding: 0px 8px 0px 8px;

      /* &.MuiInputLabel-shrink { // remove?
        color: ${(props) => props.theme.palette.primary.azur} !important;
        background-color: white;
        color: ${(props) => props.theme.palette.primary.azur};
      } */
    }
  }
`;

export const StyledSelectBase = styled(MaterialSelect)`
  && {
    position: relative;
    width: 100%;
    border: 1px solid ${(props) => props.theme.palette.primary.azur};
    max-height: 48px;
    min-height: 48px;

    &,
    & div,
    & p,
    & span {
      font-family: ${(props) => props.theme.fontFamilies.Roboto};
      font-style: normal;
      font-weight: 400;
      font-size: ${(props) => props.theme.fontSizes.body.m};
      color: ${(props) => props.theme.palette.secondary.darkGrey};
      line-height: 24px;
    }

    & > .MuiSelect-select {
      border: 1px solid transparent;
      display: block;
      padding-right: 8px;
      align-items: center;

      @media (max-width: ${(props) => props.theme.breakpoints.xxs}px) {
        display: block;
        padding: 0px 30px 0px 10px;
      }
    }

    .MuiInputBase-input {
      .spanChip:last-child {
        display: none;
      }
    }

    .MuiPaper-root {
      overflow-y: auto;
      width: min-content;
      max-height: 262px;
      margin-top: 5px;
      box-shadow: ${(props) => props.theme.elevations.medium};
      border-radius: 4px;

      ul {
        padding: 0;
        li {
          font-size: ${(props) => props.theme.fontSizes.body.s};
          line-height: 20px;

          &.Mui-selected span {
            font-weight: 700;
          }
        }
      }

      &::-webkit-scrollbar-track {
        background-image: none;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(65, 105, 226, 0.64);
        border-radius: 33px;
      }
    }

    & + label.MuiInputLabel-root {
      top: -4px;
      align-items: center;
      padding-left: 6px;
      color: ${(props) => props.theme.palette.secondary.darkGrey};
    }

    & + label.MuiInputLabel-shrink {
      top: 0;
      padding: 0 8px;
      background-color: ${(props) => props.theme.palette.primary.snow};
      color: ${(props) => props.theme.palette.primary.azur};
      font-size: ${(props) => props.theme.fontSizes.body.s};
      font-weight: 400;
      line-height: 20px;
      transform: translate(11px, -11px);
    }

    &.Mui-focused {
      border-color: ${(props) => props.theme.palette.primary.azur};

      & > .MuiSelect-select {
        max-height: 48px;

        &:not(.MuiSelect-multiple) {
          min-height: 24px;
          padding: 12px 38px 12px 16px;
        }
      }

      & + label.MuiInputLabel-shrink {
        color: ${(props) => props.theme.palette.primary.ocean};
        background-color: ${(props) => props.theme.palette.primary.snow};
        font-size: ${(props) => props.theme.fontSizes.body.s};
        font-weight: 400;
        line-height: 20px;
        transform: translate(11px, -11px);
        padding: 0 8px;
      }
    }

    &.Mui-disabled,
    &.Mui-readOnly {
      /* opacity: 1 !important; */
      border-color: ${(props) => props.theme.palette.darkerGrey.darkerGrey80};

      &,
      & div,
      & p,
      & span {
        color: ${(props) => props.theme.palette.darkerGrey.darkerGrey80};
      }

      & + label.MuiInputLabel-root,
      & + label.MuiInputLabel-shrink {
        color: ${(props) => props.theme.palette.darkerGrey.darkerGrey80};
      }
    }

    &.Mui-error {
      border-color: ${(props) => props.theme.palette.secondary.errorPink};

      &.Mui-focused > .MuiSelect-select {
        border-color: ${(props) => props.theme.palette.secondary.errorPink};
      }

      & + label.MuiInputLabel-root,
      & + label.MuiInputLabel-shrink {
        color: ${(props) => props.theme.palette.secondary.errorPink};
      }
    }

    &:hover:not(.Mui-focused, .Mui-disabled, .Mui-readOnly, .Mui-error) {
      border-color: ${(props) =>
        props.theme.palette.controlsAndStatus.hoverBlue};

      & + label.MuiInputLabel-shrink {
        color: ${(props) => props.theme.palette.controlsAndStatus.hoverBlue};
      }
    }
  }
`;

export const StyledStack = styled(Stack)`
  && {
    width: 100%;
    flex-direction: row;
    flex-wrap: nowrap;
    max-height: 32px;
    overflow: hidden;
  }
`;

export const StyledSlimChip = styled(Chip)`
  && {
    width: 0;
    flex: 1;
    justify-content: left;
    background-color: transparent;
    margin-left: 1px;

    .MuiChip-label {
      padding-left: 0px;
      padding-right: 0px;
      font-family: ${(props) => props.theme.fontFamilies.Roboto};
      font-size: ${(props) => props.theme.fontSizes.body.s};
      font-style: normal;
      font-weight: 400;

      &::after {
        content: ",";
        font-family: ${(props) => props.theme.fontFamilies.Roboto};
        font-size: ${(props) => props.theme.fontSizes.body.s};
        font-style: normal;
        font-weight: 400;
      }
    }

    &:last-child {
      .MuiChip-label {
        &::after {
          display: none;
        }
      }
    }
  }
`;

export const WrapperIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${animation({ time: "0.3s" })}
`;

export const StyledInput = styled(OutlinedInput)`
  && {
    .MuiOutlinedInput-notchedOutline {
      display: none;
    }
  }
`;

export const MenuItem = styled(MaterialMenuItem)`
  && {
    font-style: normal;
    font-weight: 400;
    font-size: ${(props) => props.theme.fontSizes.body.m};
    color: ${(props) => props.theme.palette.primary.darkerGrey};
    line-height: 20px;
    background-color: ${(props) => props.theme.palette.primary.snow};
    justify-content: normal;
    min-height: unset;

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
