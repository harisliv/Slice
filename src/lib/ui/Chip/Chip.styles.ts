import { Chip } from '@mui/material';
import { EnumWeight } from '@app/lib/types';
import styled from 'styled-components';

export const StyledChip = styled(Chip)`
  && {
    height: 24px;
    background-color: ${(props) => props.theme.palette.background.azur8};
    margin-left: 10px;

    &:focus-visible {
      background-color: ${(props) => props.theme.palette.background.azur8};
    }
    &:focus-visible .MuiChip-deleteIcon svg {
      border: 1px solid black;
      /* border-radius: 50%; */
      /* padding: 2px; */
    }

    & > span {
      font-family: ${(props) => props.theme.fontFamilies.Roboto};
      color: ${(props) => props.theme.palette.secondary.darkGrey};
      font-size: ${(props) => props.theme.fontSizes.body.xs};
      font-weight: ${EnumWeight.extraNormal};
      line-height: 22px;
      padding-left: 12px;
      padding-right: 3px;
    }

    span.UnSelectChips-remove {
      display: flex;
      /* margin: 2px 5px 0 -6px; */

      svg {
        fill: ${(props) => props.theme.palette.controlsAndStatus.hoverBlue};
        padding: 1px;
      }
    }
  }
`;
