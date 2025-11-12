import { Button } from "@mui/material";
import { Theme } from "@app/lib/general";
import type { TButtonStyling } from "@app/lib/types";
import { EnumWeight } from "@app/lib/types";
import styled, { css } from "styled-components";

export const StyledButton = styled(Button)<TButtonStyling>`
  && {
    letter-spacing: unset;
    background-color: ${(props) => props.$backgroundColor};
    font-weight: ${(props) => props.$fontWeight};
    font-size: ${(props) => props.$fontSize};
    line-height: ${(props) => props.$lineHeight ?? "unset"};
    font-family: ${(props) => props.$fontFamily};
    font-style: ${(props) => props.$fontStyle};
    height: ${(props) => props.$height};
    width: ${(props) => props.$width};
    min-width: ${(props) => props.$minWidth};
    border-color: ${(props) => props.$borderColor};
    color: ${(props) => props.$color};
    justify-items: ${(props) => props.$justifyItems};
    display: ${(props) => props.$display};
    padding: ${(props) => props.$padding};
    gap: ${(props) => props.$gap};
    border-radius: ${(props) => props.$borderRadius ?? "2px"};
    text-transform: ${(props) => props.$textTransform ?? "unset"};
    box-shadow: ${(props) => props.$boxShadow};
    ${(props) =>
      props.$isHeaderMenuButton &&
      css`
        &:focus-visible {
          outline: 2px solid ${Theme.palette.secondary.lightGreen};
          border-radius: 2px;
        }
        &.active {
          font-weight: 700;
          position: relative;
          color: ${Theme.palette.primary.snow};
        }
        &.active::after {
          content: "";
          position: absolute;
          left: 15px;
          right: 19px;
          bottom: -8px;
          width: calc(100% - 30px);
          height: 4px;
          background-color: ${Theme.palette.secondary.lightGreen};
        }
        &:not(.active)::after {
          content: "";
          position: absolute;
          left: 15px;
          right: 19px;
          bottom: -8px;
          width: 0;
          height: 4px;
          background-color: ${Theme.palette.secondary.lightGreen};
          transition: width 0.3s ease-in-out;
        }
        &:not(.active):hover::after {
          width: calc(100% - 30px);
        }
      `}
    ${(props) =>
      props.$isDrawerMenuButton &&
      css`
        &.active {
          font-weight: ${EnumWeight.bold};
        }
        &:focus-visible {
          outline: 2px solid ${Theme.palette.secondary.lightGreen};
        }
        &.active::after {
          content: "";
          position: absolute;
          left: 0;
          width: 4px;
          height: 22px;
          background-color: ${Theme.palette.secondary.lightGreen};
        }
        &:not(.active)::after {
          content: "";
          position: absolute;
          left: 0;
          width: 0;
          height: 0;
          background-color: ${Theme.palette.secondary.lightGreen};
          transition: width 0.3s ease-in-out;
        }
        &:not(.active):hover::after {
          position: absolute;
          left: 0px;
          width: 4px;
          height: 22px;
          background-color: ${Theme.palette.secondary.lightGreen};
        }
      `}
      ${(props) =>
      !props.$isHeaderMenuButton &&
      !props.$isHeaderMenuButton &&
      props.variant === "contained" &&
      css`
        &:hover {
          background-color: ${Theme.palette.controlsAndStatus.hoverBlue};
        }
        &:active {
          background-color: ${Theme.palette.primary.ocean};
        }
        &:focus-visible {
          border: solid 1px ${Theme.palette.primary.ocean};
        }
        &.Mui-disabled {
          color: ${Theme.palette.primary.snow};
          background-color: ${Theme.palette.controlsAndStatus.disabled};
          .MuiButton-startIcon svg path,
          .MuiButton-endIcon svg path {
            fill: ${Theme.palette.primary.snow};
            color: ${Theme.palette.primary.snow};
          }
        }
      `}
      ${(props) =>
      !props.$isHeaderMenuButton &&
      props.variant === "outlined" &&
      css`
        &:hover {
          border-color: ${Theme.palette.controlsAndStatus.hoverBlue};
          color: ${Theme.palette.controlsAndStatus.hoverBlue};
        }
        &:active {
          border-color: ${Theme.palette.primary.ocean};
          color: ${Theme.palette.primary.ocean};
        }
        &:focus-visible {
          border: solid 1px ${Theme.palette.primary.ocean};
        }
        &.Mui-disabled {
          color: ${Theme.palette.controlsAndStatus.disabled};
          border: solid 1px ${Theme.palette.controlsAndStatus.disabled};
          border-radius: 2px;

          .MuiButton-startIcon svg path,
          .MuiButton-endIcon svg path {
            fill: ${Theme.palette.controlsAndStatus.disabled};
            color: ${Theme.palette.controlsAndStatus.disabled};
          }
        }
      `}
      ${(props) =>
      !props.$isHeaderMenuButton &&
      props.variant === "text" &&
      css`
        &:hover {
          color: ${Theme.palette.controlsAndStatus.hoverBlue};
        }
        &:active {
          color: ${Theme.palette.primary.ocean};
        }
        &:focus-visible {
          border: solid 1px ${Theme.palette.primary.ocean};
        }
        &.Mui-disabled {
          color: ${Theme.palette.controlsAndStatus.disabled};
          .MuiButton-startIcon svg path,
          .MuiButton-endIcon svg path {
            fill: ${Theme.palette.controlsAndStatus.disabled};
            color: ${Theme.palette.controlsAndStatus.disabled};
          }
        }
      `}
  }
`;
