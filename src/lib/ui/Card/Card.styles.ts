import { Box } from "@mui/material";
import styled from "styled-components";

export const CardWrapper = styled(Box)<{ $backgroundColor?: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${(props) => props.$backgroundColor};
  border-radius: 6px;
  padding: 8px 16px;
  min-width: 172px;
  box-shadow: 0px 2px 7px 0px rgba(25, 25, 112, 0.12);
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    padding: 16px;
  }
`;

export const CardContentContainer = styled(Box)<{ $fullWidth: boolean }>`
  display: flex;
  width: 100%;
  flex: 1;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: ${(props) => (props.$fullWidth ? "row" : "column")};
`;

export const StyledIconContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 81px;
  height: 81px;
  background-color: ${(props) => props.theme.palette.background.azur8};
  border-radius: 100%;
  display: flex;
  margin-right: 20px;
  padding: 12.6px;
`;

export const CardTitleContainer = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0;
  padding: 0;
  justify-content: flex-start;
  gap: 8px;
`;

export const CardButtonContainer = styled(Box)`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
