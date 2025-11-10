import { Table, TableContainer, TableRow } from '@mui/material';
import { Theme } from '@app/lib/general';
import styled from 'styled-components';

export const StyledTableContainer = styled(TableContainer)`
  box-shadow: var(--box-shadow-base);
  border-radius: 6px;
  /* table {
  } */
`;

export const StyledTable = styled(Table)`
  border-spacing: 0 8px;
  border: none;
  border-collapse: separate;
`;

export const StyledTableRow = styled(TableRow)`
  border-radius: 6px 6px 0px 0px;

  padding: 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #424245;
  vertical-align: center;
  box-shadow: var(--box-shadow-base);
  border: none;

  &:last-child {
    transform: translateY(8px);
  }

  & > td:not(:last-child) {
    border-right: none;
  }

  &:first-child > td:first-child {
    border-top-left-radius: 6px;
  }

  &:first-child > td:last-child {
    border-top-right-radius: 6px;
  }
`;

export const StyledTableHeader = styled(TableRow)`
  background-color: ${Theme.palette.primary.azur};
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  transform: translateY(-6px);
  height: 49px;
  .MuiTableCell-root {
    padding: 20px 12px 13px 15px;
    color: ${Theme.palette.primary.snow};
  }
`;
