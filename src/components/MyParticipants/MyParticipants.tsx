import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnFiltersState,
  type VisibilityState,
  type Row
} from '@tanstack/react-table';
import { Stack, TableCell } from '@mui/material';
import { defaultVisibileColumns } from './MyParticipants.types';
import {
  ButtonComponent,
  MainWrapperWithSubHeader,
  Modal,
  ShadowContainerWithTopPadding,
  SkeletonComponent,
  StyledHeader2Cell,
  StyledTable2Header,
  StyledTable2Row,
  SubHeader,
  TableComponent,
  TableSort2
} from '@app/lib/ui';
import Pagination from './Pagination/Pagination';
import { FormSection } from '@app/lib/ui';
import { convertFormValuesToColumnFilters } from './MyParticipants.helpers';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import TableActions from './TableActions';
import { ChevronLeftIcon } from '@app/lib/icons';
import { NavLink } from 'react-router';
import { type TFilters, defaultFiltersValues, filtersSchema } from '@app/types';
import { Filters } from './Filters';
import SearchAndAppliedFilters from './SearchAndAppliedFilters';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useMyParticipants from '@app/hooks/useMyParticipants';
import { useParticipantColumns } from './useParticipantColumns';
import { useActiveInitiative, useParticipantLoading } from '@app/hooks';
import { ParticipantCount } from '@app/components/MyParticipants';

dayjs.extend(customParseFormat);

export default function MyParticipants() {
  const { activeInitiative } = useActiveInitiative();

  const methods = useForm({
    defaultValues: defaultFiltersValues,
    resolver: zodResolver(filtersSchema)
  });

  const { data: dataMyPrticipantsTable } = useMyParticipants();
  const isLoading = useParticipantLoading();

  const { reset } = methods;

  const [globalFilter, setGlobalFilter] = useState<string>('');

  const globalFilterFn = (
    row: Row<any>,
    columnId: string,
    filterValue: string
  ) => {
    const search = String(filterValue.toLowerCase());
    const columnsToSearch = [
      'entityOperatingName',
      'legalName',
      'identityNumber'
    ];
    if (!columnsToSearch.includes(columnId)) return false;
    return columnsToSearch.some((col) => {
      let value = String(row.getValue(col) ?? '');
      value = value.toLowerCase();
      return value.includes(search);
    });
  };

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [visibility, setVisibility] = useState<VisibilityState>(
    defaultVisibileColumns
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const resetFiltersToEmpty = () => {
    setColumnFilters([]);
    reset();
  };

  const columns = useParticipantColumns();

  const onSubmit = (data: TFilters) => {
    const newColumnFilters = convertFormValuesToColumnFilters(data);
    setColumnFilters(newColumnFilters);
    setIsModalOpen(false);
  };

  const onClear = () => {
    setIsModalOpen(false);
    resetFiltersToEmpty();
  };

  const table = useReactTable({
    data: dataMyPrticipantsTable || [],
    columns,
    filterFns: {
      includesString: (row, columnId, filterValue: string) => {
        const value = row.getValue<string>(columnId) ?? '';
        return value.toLowerCase().includes(filterValue.toLowerCase());
      }
    },
    state: {
      columnFilters: columnFilters,
      globalFilter: globalFilter,
      columnVisibility: visibility
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: globalFilterFn,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableMultiSort: true,
    debugTable: false,
    debugHeaders: false,
    debugColumns: false
  });

  const headerGroups = table.getHeaderGroups().map((headerGroup) => (
    <StyledTable2Header key={headerGroup.id}>
      {headerGroup.headers.map((header) => (
        <StyledHeader2Cell key={header.id} colSpan={header.colSpan}>
          {header.isPlaceholder ? null : (
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              {...{
                className: header.column.getCanSort()
                  ? 'cursor-pointer select-none'
                  : '',
                onClick: header.column.getToggleSortingHandler()
              }}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
              {header.column.getCanSort() && (
                <TableSort2 column={header.column} />
              )}
            </div>
          )}
        </StyledHeader2Cell>
      ))}
    </StyledTable2Header>
  ));

  const rows = table.getRowModel().rows.map((row) => (
    <StyledTable2Row key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </StyledTable2Row>
  ));

  return (
    <>
      <SubHeader
        title="My Participants"
        subtitle="In this section you can view, add and remove participants in your Initiative."
      >
        <ButtonComponent
          customVariant="terciary-s"
          startIcon={<ChevronLeftIcon />}
          to="/student-management"
          RouterLink={NavLink}
        >
          Back to Participant management overview
        </ButtonComponent>
      </SubHeader>
      {isLoading ? (
        <SkeletonComponent />
      ) : (
        <MainWrapperWithSubHeader $containerWidth="L">
          <ShadowContainerWithTopPadding>
            <FormSection
              title={activeInitiative?.name}
              variant={activeInitiative?.initiativeStatus}
              divider={false}
            />
            <ParticipantCount />

            <FormProvider {...methods}>
              <Stack
                mb={1}
                mt={3}
                direction="column"
                justifyContent="flex-start"
              >
                <ShadowContainerWithTopPadding>
                  <SearchAndAppliedFilters
                    setGlobalFilter={setGlobalFilter}
                    globalFilter={globalFilter}
                    setColumnFilters={setColumnFilters}
                    columnFilters={columnFilters}
                    resetFiltersToEmpty={resetFiltersToEmpty}
                    setIsModalOpen={setIsModalOpen}
                  />
                </ShadowContainerWithTopPadding>
                <TableActions
                  table={table}
                  hasActiveFilters={columnFilters.length > 0}
                  visibility={visibility}
                  setVisibility={setVisibility}
                />
                <Modal
                  modalTitle="Filters"
                  onClose={() => setIsModalOpen(false)}
                  open={isModalOpen}
                  $width="768px"
                  keepMounted={false}
                >
                  <Filters
                    onSubmit={onSubmit}
                    onClear={onClear}
                    visibility={visibility}
                  />
                </Modal>
              </Stack>
            </FormProvider>

            <TableComponent headerGroups={headerGroups} rows={rows} />

            <Pagination table={table} />
          </ShadowContainerWithTopPadding>
        </MainWrapperWithSubHeader>
      )}
    </>
  );
}
