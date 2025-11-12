import { IconButton as MuiIconButton } from "@mui/material";
import styled from "styled-components";
import { EnumWeight } from "@app/lib/types";

export const StyledButton = styled(MuiIconButton)`
  && {
    background-color: transparent;
    cursor: pointer;
    border-radius: 2px;
    font-size: ${(props) => props.theme.fontSizes.body.m};
    font-weight: ${EnumWeight.extraNormal};
    text-transform: unset;
    border: none;
  }
`;
