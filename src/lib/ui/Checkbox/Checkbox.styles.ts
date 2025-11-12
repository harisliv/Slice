import { Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Theme } from '@app/lib/general';

export const StyledFormControlLabel = styled(FormControlLabel)`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  & .MuiFormControlLabel-label {
    font-size: 14px;
    color: ${Theme.palette.primary.darkerGrey};
  }
`;

export const StyledMuiCheckbox = styled(Checkbox)`
  color: ${Theme.palette.primary.azur};

  &.Mui-checked {
    color: ${Theme.palette.primary.azur};
  }
`;
