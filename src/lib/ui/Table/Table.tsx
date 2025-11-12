import React from 'react';
import { TableBody, TableHead } from '@mui/material';
import { StyledTable, StyledTableContainer } from './Table.styles';
import SkeletonComponent from '../Skeleton';

interface TableProps {
  headerGroups: React.ReactNode[];
  rows: React.ReactNode[];
  loading?: boolean;
}

export default function TableComponent({
  headerGroups,
  rows,
  loading
}: TableProps) {
  return (
    <StyledTableContainer sx={{ overflowY: 'hidden', overflowX: 'auto' }}>
      <StyledTable>
        <TableHead>{headerGroups}</TableHead>
        {loading ? <SkeletonComponent /> : <TableBody>{rows}</TableBody>}
      </StyledTable>
    </StyledTableContainer>
  );
}
