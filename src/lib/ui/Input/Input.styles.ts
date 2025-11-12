import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import type { Theme } from "@app/lib/general";
import styled from "styled-components";

export const StyledRequiredLabelStar = styled.span`
  color: ${(props) => props.theme.palette.secondary.errorPink};
`;

export const StyledRequiredLabelSpan = styled.span<{
  $fontSize?: keyof typeof Theme.fontSizes.body;
}>`
  color: ${(props) => props.theme.palette.primary.darkerGrey};
  font-size: ${(props) =>
    props.$fontSize ? props.theme.fontSizes.body[props.$fontSize] : "16px"};

  &.Mui-focused {
    color: ${(props) => props.theme.palette.primary.azur};
  }
`;

export const StyledTextField = styled(TextField)<{
  $hasResize?: boolean;
}>`
  /* input */
  .MuiOutlinedInput-root {
    min-height: 48px;
    height: 48px;

    input {
      min-height: 48px;
      height: 48px;
    }
  }

  /* default label empty and not active */
  .MuiFormLabel-root {
    color: ${(props) => props.theme.palette.secondary.darkGrey};
    font-family: ${(props) => props.theme.fontFamilies.Roboto};
    font-size: ${(props) => props.theme.fontSizes.body.s};

    /* label on focus */
    &.Mui-focused {
      color: ${(props) => props.theme.palette.primary.azur};
    }

    /* blue label filled */
    &.MuiFormLabel-filled:not(.Mui-disabled):not(.Mui-error) {
      color: ${(props) => props.theme.palette.primary.azur};
    }

    /* red label on error */
    &.Mui-error {
      color: ${(props) => props.theme.palette.secondary.errorPink};
    }

    /* disabled */
    &.Mui-disabled {
      color: ${(props) => props.theme.palette.controlsAndStatus.disabled};
      cursor: default;
    }
  }

  .MuiFormLabel-filled ~ .MuiOutlinedInput-root input {
    font-size: ${(props) => props.theme.fontSizes.body.s};
    color: ${(props) => props.theme.palette.primary.darkerGrey};
  }

  /* asterisk */
  .MuiFormLabel-asterisk {
    color: ${(props) => props.theme.palette.secondary.errorPink};
  }

  /* blue border */
  .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) => props.theme.palette.primary.azur};
  }

  /* blue border hover */
  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) => props.theme.palette.controlsAndStatus.hoverBlue};
  }

  /* blue border focus */
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: ${(props) => props.theme.palette.primary.ocean} solid 2px;
  }

  /* red border on error */
  .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${(props) => props.theme.palette.secondary.errorPink};
  }

  /* red border on error focused */
  .MuiOutlinedInput-root.Mui-error.Mui-focused
    .MuiOutlinedInput-notchedOutline {
    border: 2px solid ${(props) => props.theme.palette.secondary.errorPink};
  }

  /* grey border on disabled */
  .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) => props.theme.palette.controlsAndStatus.disabled};
  }

  /* textarea */
  .MuiOutlinedInput-root textarea {
    font-size: ${(props) => props.theme.fontSizes.body.s};
    color: ${(props) => props.theme.palette.primary.darkerGrey};
    resize: ${(p) => (!p.$hasResize ? "" : "vertical")};
  }

  .MuiInputBase-multiline {
    min-height: auto;
    height: auto;

    textarea {
      min-height: auto;
      height: auto;
    }
  }

  /* helper */
  .MuiFormHelperText-root {
    margin-left: 0;
    font-size: ${(props) => props.theme.fontSizes.body.xs};
    color: ${(props) => props.theme.palette.primary.darkerGrey};
  }
`;

export const WrapperIcon = styled(Box)<{ $error?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 18px;
    height: 18px;
  }
`;

export const StyledCounter = styled(Box)`
  margin-top: 8px;
`;
