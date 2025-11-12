import { EnumWeight } from "@app/lib/types";
import styled from "styled-components";

export const StyledMaxOptions = styled.div`
  && {
    height: 35px;
    background-color: ${(props) => props.theme.palette.background.azur8};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: sticky;
    bottom: 53px;
    border-top: 1px solid ${(props) => props.theme.palette.background.lightGrey};
    z-index: 1;

    & > span {
      font-family: ${(props) => props.theme.fontFamilies.Roboto};
      color: ${(props) => props.theme.palette.primary.darkerGrey};
      font-size: ${(props) => props.theme.fontSizes.body.xs};
      font-weight: ${EnumWeight.normal};
      padding: 8px 12px;
    }
  }
`;
