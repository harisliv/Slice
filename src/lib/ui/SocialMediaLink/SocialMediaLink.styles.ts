import { Box } from "@mui/material";
import { styled } from "styled-components";

export const LinkWrapper = styled(Box)`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

export const IconWrapper = styled(Box)`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  align-self: center;
  line-height: 0;
`;

export const TextWrapper = styled.span`
  display: inline-block;
`;
