import { Stack } from '@mui/material';
import { EnumWeight } from '@app/lib/types';
import styled from 'styled-components';

export const Body = styled(Stack)`
  /* padding-top: 8px; */

  label {
    font-size: ${(p) => p.theme.fontSizes.body.s};
    color: ${(p) => p.theme.palette.primary.darkerGrey};
    font-weight: ${EnumWeight.normal};
  }

  .MuiOutlinedInput-root,
  .MuiInputBase-root {
    min-height: 44px;
  }
`;

/** “+ Add another” container and helper text area */
export const AddAnotherWrap = styled.div`
  margin-top: 12px;

  .helper {
    margin-top: 4px;
    font-size: ${(p) => p.theme.fontSizes.body.xs};
    color: ${(p) => p.theme.palette.primary.darkerGrey};
  }
`;

/** Right side of the modal title (title + close icon) */
export const TitleRight = styled.div`
  display: flex;
  align-items: center;

  /* ensure the title uses your heading color/weight */
  & > span {
    color: ${(p) => p.theme.palette.primary.ocean};
    font-weight: ${EnumWeight.bold};
    font-size: ${(p) => p.theme.fontSizes.headings.h5};
  }
`;
