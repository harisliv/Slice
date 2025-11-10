import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from 'styled-components';

export const StyleDatePicker = styled(DatePicker)`
  width: 100%;
  .MuiOutlinedInput-input {
    padding: 14px;
    font-size: ${(props) => props.theme.fontSizes.body.s};
    color: ${(props) => props.theme.palette.primary.darkerGrey};
  }
  .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-input {
    color: ${(props) => props.theme.palette.secondary.errorPink};
  }
  .MuiOutlinedInput-root {
    height: 49px;
    .MuiOutlinedInput-notchedOutline {
      border: 1px solid ${(props) => props.theme.palette.primary.azur};
    }
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border: 2px solid ${(props) => props.theme.palette.primary.ocean};
    }
    &.Mui-error .MuiOutlinedInput-notchedOutline {
      border: 1px solid ${(props) => props.theme.palette.secondary.errorPink};
    }

    &.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline {
      border: 2px solid ${(props) => props.theme.palette.secondary.errorPink};
    }
  }

  .MuiFormLabel-root {
    font-family: ${(props) => props.theme.fontFamilies.Roboto};
    font-size: ${(props) => props.theme.fontSizes.body.s};
    color: ${(props) => props.theme.palette.primary.darkerGrey};
    .MuiFormLabel-asterisk {
      color: ${(props) => props.theme.palette.secondary.errorPink};
    }
    &.Mui-error {
      color: ${(props) => props.theme.palette.secondary.errorPink} !important;

      span {
        color: ${(props) => props.theme.palette.secondary.errorPink} !important;
      }
    }
    /* Label azur cuando está activa (focused o shrink) */
    &.Mui-focused:not(.Mui-disabled):not(.Mui-error),
    &.MuiInputLabel-shrink:not(.Mui-disabled):not(.Mui-error) {
      span:first-child {
        top: 2px;
        color: ${(props) => props.theme.palette.primary.azur};
      }
    }

    &.MuiFormLabel-filled:not(.Mui-disabled):not(.Mui-error) {
      top: 2px;
      color: ${(props) => props.theme.palette.primary.azur};
      span:first-child {
        color: ${(props) => props.theme.palette.primary.azur};
      }
    }

    &.MuiFormLabel-filled.Mui-disabled {
      top: 0;
      color: ${(props) => props.theme.palette.secondary.darkGrey};
      cursor: default;
    }
  }
  .MuiFormHelperText-root {
    margin: 0;
  }
`;
