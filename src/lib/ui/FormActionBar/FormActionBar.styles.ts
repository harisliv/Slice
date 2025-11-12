import { Box } from "@mui/material";
import styled from "styled-components";

export const StyledFormActionWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  bottom: 0;
  width: 100%;
  height: 72px;
  position: fixed;
  background: white;
  border-top: 1px solid ${(props) => props.theme.palette.secondary.lightGreen};
  padding: 0 24px;
  justify-content: space-between;
  align-items: center;
  z-index: 123;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    padding: 0 10px;
  }
`;

export const StyledLeftWrapper = styled(Box)`
  display: flex;
  gap: 20px;
`;
export const StyledRightWrapper = styled(Box)`
  display: flex;
  gap: 20px;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    gap: 5px;
  }
`;

/** Mobile Containers */
export const StyledFormMobileActionWrapper = styled(Box)`
  position: relative;
`;

export const MobileGlobalContainer = styled(Box)<{ $isExpanded?: boolean }>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 20px;
  bottom: 0px;
  width: 100%;
  height: ${(props) => (props.$isExpanded ? "fit-content" : "25px")};
  position: fixed;
  background: white;
  border-top: 1px solid ${(props) => props.theme.palette.secondary.lightGreen};
  padding: ${(props) => (props.$isExpanded ? "15px 24px" : "5px 24px")};
  z-index: 123;
  box-shadow: 0px 4px 12px 4px rgba(25, 25, 112, 0.08);
`;

export const MobileChildrenContainer = styled(Box)<{ $isExpanded?: boolean }>`
  display: ${(props) => (props.$isExpanded ? "flex" : "none")};
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const StyledArrowContainer = styled(Box)`
  position: absolute;
`;

export const StyledIcon = styled(Box)`
  margin-top: 3px;
  margin-left: 5px;
  cursor: pointer;
`;

export const StyledIconContainer = styled(Box)<{ $isExpanded?: boolean }>`
  position: absolute;
  left: 10px;
  bottom: ${(props) => (props.$isExpanded ? "126px" : "24px")};
  border-bottom: 1px solid
    ${(props) => props.theme.palette.secondary.lightGreen} !important;
  width: 30px;
  height: 25px;
  background: white !important;
  box-shadow: rgba(25, 25, 112, 0.12) !important;
  border-radius: 4px 4px 0px 0px !important;
  z-index: auto;
`;
