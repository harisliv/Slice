import { TableCell, TableContainer, TableRow } from "@mui/material";
import { Theme } from "@app/lib/general";
import { EnumWeight } from "@app/lib/types";
import styled from "styled-components";

export const StyledTable2Container = styled(TableContainer)`
  border-radius: 10px 10px 0 0;
`;

export const StyledTable2Row = styled(TableRow)`
  border-radius: 6px 6px 0px 0px;
  padding: 0px;
  font-family: "Roboto", sans-serif;
  font-weight: ${EnumWeight.normal};
  font-size: ${Theme.fontSizes.body.m};
  vertical-align: center;
  border: solid 1px ${Theme.palette.background.grey};

  .MuiTableCell-root {
    padding: 8px;
    color: ${Theme.palette.primary.darkerGrey};
    border-right: solid 1px ${Theme.palette.background.grey};
  }
`;

export const StyledTable2Header = styled(TableRow)`
  && {
    font-family: "Roboto", sans-serif;
    font-weight: ${EnumWeight.normal};
    font-size: ${Theme.fontSizes.body.m};
    transform: translateY(-0.3px);
    height: 49px;
    .MuiTableCell-root {
      padding: 8px;
      color: ${Theme.palette.primary.snow};
    }
  }
`;

export const StyledHeader2Cell = styled(TableCell)`
  background-color: ${Theme.palette.azur.azur130};
  color: ${Theme.palette.primary.snow};
  border-right: 0.5px solid ${Theme.palette.primary.snow};
  &:last-of-type {
    border-right: none;
  }

  & .sortable {
    cursor: pointer;
  }
`;
