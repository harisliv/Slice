import { Backdrop, Box } from "@mui/material";
import styled from "styled-components";

export const StyledBackdrop = styled(Backdrop)`
  z-index: 9999 !important;
  background-color: rgba(255, 255, 255, 0.8) !important;
  pointer-events: none !important;
  backdrop-filter: saturate(180%) blur(5px);
  backface-visibility: hidden;
`;

export const LogoLoadingWrapper = styled(Box)`
  animation: zoominout 1s infinite;
  svg {
    width: 90px;
    height: 90px;
    path {
      fill: ${(props) => props.theme.palette.primary.ocean}!important;
    }
  }
`;
