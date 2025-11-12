import { InputAdornment } from "@mui/material";
import MuiAutocomplete from "@mui/material/Autocomplete";
import styled from "styled-components";
import type { ACProps } from "./Autocomplete.types";

const TypedAutocomplete =
  MuiAutocomplete as unknown as React.ForwardRefExoticComponent<
    ACProps & React.RefAttributes<HTMLDivElement>
  >;

/** Styles <Autocomplete/> */
export const StyledAutocomplete = styled(TypedAutocomplete)`
  && {
    /* Outlined input container */
    .MuiOutlinedInput-root {
      height: 48px;
      border-radius: 4px;
      padding: 0 !important;

      /* Continuous border in primary.azur */
      .MuiOutlinedInput-notchedOutline {
        border-color: ${({ theme }) => theme.palette.primary.azur};
        border-width: 1px;
        legend {
          max-width: 0.01px;
        } /* remove notch gap */
      }

      /* Input padding */
      .MuiOutlinedInput-input {
        padding: 14px 8px;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0;
        vertical-align: middle;

        /* Placeholder style */
        &::placeholder {
          color: ${({ theme }) => theme.palette.primary.darkerGrey};
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0;
          opacity: 1;
        }
      }
    }

    /* never shrink the label (we rely on placeholder) */
    .MuiInputLabel-root {
      display: none;
    }

    .MuiInputAdornment-root .MuiButtonBase-root.MuiButton-root {
      margin: 0 !important;
      padding: 4px 8px !important;
      min-width: unset;
      border-radius: 2px;
      gap: 8px; /* icon/text gap */
      background: transparent !important; /* keep transparent on hover/focus */
      box-shadow: none !important;
    }

    .MuiOutlinedInput-root.Mui-disabled {
      cursor: not-allowed;

      .MuiOutlinedInput-notchedOutline {
        border-color: ${({ theme }) =>
          theme.palette.controlsAndStatus.disabled};
      }

      &:hover .MuiOutlinedInput-notchedOutline,
      &.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: ${({ theme }) =>
          theme.palette.controlsAndStatus.disabled};
      }

      .MuiOutlinedInput-input {
        color: ${({ theme }) => theme.palette.controlsAndStatus.disabled};
        &::placeholder {
          color: ${({ theme }) => theme.palette.controlsAndStatus.disabled};
          opacity: 1;
        }
      }

      .MuiInputAdornment-root {
        color: ${({ theme }) => theme.palette.controlsAndStatus.disabled};
        pointer-events: none;
        svg,
        svg * {
          fill: currentColor !important;
        }
      }
    }

    /* Clear action stays transparent, even on focus/hover */
    .MuiAutocomplete-endAdornment,
    .MuiAutocomplete-clearIndicator,
    .MuiAutocomplete-clearIndicator:hover,
    .MuiAutocomplete-clearIndicator:focus {
      background: transparent !important;
      box-shadow: none;
      margin: 1 !important;
    }
  }
`;

export const AdornmentStart = styled(InputAdornment)`
  margin-left: 16px;
`;

export const AdornmentEnd = styled(InputAdornment)<{ $disabled?: boolean }>`
  && {
    padding: 4px 8px;
    margin: 0 16px 0 0 !important;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
    pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
    color: ${({ theme, $disabled }) =>
      $disabled
        ? theme.palette.controlsAndStatus.disabled
        : theme.palette.primary.azur};

    svg,
    svg * {
      fill: currentColor !important;
    }
  }
`;

export const ClearText = styled.p`
  font-weight: 500;
  font-style: Medium;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;
  color: currentColor;
`;
