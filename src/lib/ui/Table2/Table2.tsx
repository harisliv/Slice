import React from 'react';
import { Table, TableBody, TableHead } from '@mui/material';
import { StyledTable2Container } from './Table2.styles';

interface TableProps {
  headerGroups: React.ReactNode[];
  rows: React.ReactNode[];
}

export default function Table2Component({ headerGroups, rows }: TableProps) {
  return (
    <StyledTable2Container>
      <Table>
        <TableHead>{headerGroups}</TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    </StyledTable2Container>
  );
}
