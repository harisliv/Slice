import { Box, Pagination } from "@mui/material";
import styled from "styled-components";
import { EnumWeight } from "@app/lib/types";
import { Select } from "@app/lib/ui";

export const StyledPaginationWrapper = styled(Box)``;

export const StyledChildrenContainer = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 20px;
`;

export const StyledPaginationContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2;
  flex-wrap: wrap;
  @media (max-width: ${(props) => props.theme.breakpoints.sm - 1}px) {
    flex-direction: column;
    gap: 8px;
    justify-content: center;
  }
`;

export const StyledPaginationContentContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin: 8px 0 0 0;
  justify-content: center;
`;

export const StyledSelectContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledSelect = styled(Select)`
  &.MuiSelect-root {
    border: none;
  }

  .MuiInputBase-root {
    border: none;
  }

  .MuiSelect-select {
    border: none !important;
    padding: 0px 20px 0px 0px !important;
    font-weight: ${EnumWeight.bold} !important;
    font-size: ${(props) => props.theme.fontSizes.body.m} !important;
  }

  .MuiSelect-icon {
    right: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 16px;
      height: 16px;
    }
  }
  .MuiSelect-iconOpen {
    margin-top: -4px;
  }
`;

export const StyledPagination = styled(Pagination)`
  .MuiPaginationItem-root {
    color: ${(props) =>
      props.theme.palette.primary
        .azur}; // Default text color for non-selected pages
    min-width: 24px;
    height: 24px;
    margin: 0;
    line-height: 2;
  }
`;

export const StyledPaginationText = styled.div`
  font-size: ${(props) => props.theme.fontSizes.body.m};
  margin: 0;
`;
