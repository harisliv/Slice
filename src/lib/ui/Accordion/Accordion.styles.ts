import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import styled from "styled-components";
import { EnumWeight } from "@app/lib/types";

export const StyledContainer = styled(Box)`
  width: 100%;
`;

export const StyledAccordion = styled(Accordion)`
  box-shadow: none !important;
  border: none;
  background: none;

  &::before {
    content: none !important;
  }

  .MuiAccordion-root:last-of-type {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export const StyledAccordionSummary = styled(AccordionSummary)<{
  $removeborder?: boolean;
}>`
  display: flex;
  flex-direction: row-reverse;
  font-weight: bold;
  gap: 4px;
  padding: 0 !important;
  min-height: 40px !important;
  border-bottom: ${(props) =>
    props.$removeborder
      ? "none"
      : `2px solid ${props.theme.palette.primary.ocean}`} !important;

  svg {
    width: 24px;
    height: 24px;
  }

  .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
    margin: 0;
    transform: rotate(90deg);
  }
  .MuiAccordionSummary-content.Mui-expanded {
    margin: 10px 0;
  }

  .MuiAccordionSummary-content {
    margin: 10px 0;
    font-weight: ${EnumWeight.normal};
    line-height: 32px;
    font-size: ${(props) => props.theme.fontSizes.headings.h2};
    color: ${(props) => props.theme.palette.primary.azur};
    font-family: ${(props) => props.theme.fontFamilies.Lora};
  }

  .MuiAccordionSummary-content .Mui-expanded {
    margin: 0;
  }
`;

export const StyledAccordionDetails = styled(AccordionDetails)`
  padding: 24px 2px 0 28px !important;
`;
