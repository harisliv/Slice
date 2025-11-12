import { Menu, MenuItem } from "@mui/material";
import styled from "styled-components";
import { P } from "@app/lib/ui";
import { EnumWeight } from "@app/lib/types";
import IconButton from "../IconButton";

export const StyledMenu = styled(Menu)`
  .MuiList-root {
    display: flex;
    flex-direction: column;
    padding: 5px 10px;

    button {
      width: fit-content;
    }
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

export const StyledIconButton = styled(IconButton)`
  padding: 0;
  gap: 5px;
`;

// TODO : replce with Paragraph small-regular-azur
export const StyledTitle = styled(P)`
  margin: 0;
  padding: 0;
  font-size: ${(props) => props.theme.fontSizes.body.m};
  font-family: ${(props) => props.theme.fontFamilies.Roboto};
  font-weight: ${EnumWeight.normal};
  color: ${(props) => props.theme.palette.primary.azur};
`;
