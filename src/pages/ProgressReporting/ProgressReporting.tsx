import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  createColumnHelper,
  flexRender,
  type ColumnFiltersState
} from '@tanstack/react-table';
import { TableCell, Stack } from '@mui/material';
import type {
  TProgressReportingData,
  TProgressReportingTableActions
} from '@app/types';
import { EditIcon, PlusIcon, ShowIcon, TrashBinIcon } from '@app/lib/icons';
import {
  CustomTag,
  FormModal,
  MainWrapperWithSubHeader,
  ShadowContainerWithTopPadding,
  SkeletonComponent,
  StyledTableHeader,
  StyledTableRow,
  SubHeader,
  TableComponent,
  TableSort
} from '@app/lib/ui';
import { ButtonComponent } from '@app/lib/ui';
import { FormSection } from '@app/lib/ui';
import { useNavigate } from 'react-router';
import {
  useActiveInitiative,
  useCreateNewReport,
  useDeleteProgressReporting,
  useGlobalLoading,
  useProgressReporting
} from '@app/hooks';
import ViewReportModal from './components/ViewReportModal';

const ActionButtons = ({
  actions,
  id,
  deleteReport,
  viewReport
}: {
  actions: TProgressReportingTableActions[];
  id: string;
  deleteReport: () => void;
  viewReport: () => void;
}) => {
  const navigate = useNavigate();

  const editReport = () => {
    navigate(`/assignment-management/create-assignment/${id}`);
  };

  const getActionButton = (action: TProgressReportingTableActions) => {
    switch (action) {
      case 'EDIT':
        return (
          <ButtonComponent
            customVariant="terciary-m"
            startIcon={<EditIcon />}
            onClick={editReport}
          >
            Continue draft
          </ButtonComponent>
        );
      case 'DELETE':
        return (
          <ButtonComponent
            customVariant="terciary-m"
            startIcon={<TrashBinIcon />}
            onClick={deleteReport}
          >
            Delete draft
          </ButtonComponent>
        );
      case 'VIEW':
        return (
          <ButtonComponent
            title="View assignment"
            customVariant="terciary-m"
            startIcon={<ShowIcon />}
            onClick={viewReport}
          >
            View assignment
          </ButtonComponent>
        );
      default:
        return null;
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      {actions.map((action) => (
        <React.Fragment key={action}>{getActionButton(action)}</React.Fragment>
      ))}
    </Stack>
  );
};

const columnHelper = createColumnHelper<TProgressReportingData>();

const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('-');
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

const parseDateRange = (dateRange: string): Date => {
  const startDate = dateRange.split(' to ')[0];
  return parseDate(startDate);
};

export default function ProgressReporting() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [reportToDelete, setReportToDelete] = React.useState<string>('');
  const [reportToView, setReportToView] = React.useState<string>('');

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    React.useState<boolean>(false);
  const { activeInitiative } = useActiveInitiative();
  const { data: tableData = [] } = useProgressReporting();

  const { mutate: deleteProgressReporting } =
    useDeleteProgressReporting(reportToDelete);

  const isLoading = useGlobalLoading();

  const columns = React.useMemo(
    () => [
      columnHelper.accessor('timeframeOfInformation', {
        header: 'Timeframe of information',
        cell: (info) => info.getValue(),
        sortingFn: (rowA, rowB, columnId) => {
          const dateA = parseDateRange(rowA.getValue(columnId));
          const dateB = parseDateRange(rowB.getValue(columnId));
          return dateA.getTime() - dateB.getTime();
        }
      }),
      columnHelper.accessor('draftLatestUpdate', {
        header: 'Draft latest update / Assignment submission date',
        cell: (info) => info.getValue(),
        sortingFn: (rowA, rowB, columnId) => {
          const dateA = parseDate(rowA.getValue(columnId));
          const dateB = parseDate(rowB.getValue(columnId));
          return dateA.getTime() - dateB.getTime();
        }
      }),
      columnHelper.accessor('reportingStatus', {
        header: 'Assignment status',
        cell: (info) => <CustomTag variant={info.getValue()} />,
        enableSorting: false
      }),
      columnHelper.display({
        id: 'actions',
        cell: (info) => (
          <ActionButtons
            actions={info.row.original.actions}
            id={info.row.original.id}
            deleteReport={() => {
              setIsDeleteModalOpen(true);
              setReportToDelete(info.row.original.id);
            }}
            viewReport={() => {
              setReportToView(info.row.original.id);
              setIsModalOpen(true);
            }}
          />
        ),
        enableSorting: false
      })
    ],
    []
  );

  const table = useReactTable({
    data: tableData,
    columns,
    filterFns: {},
    state: {
      columnFilters
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableMultiSort: false,
    debugTable: false,
    debugHeaders: false,
    debugColumns: false
  });

  const headerGroups = table.getHeaderGroups().map((headerGroup) => (
    <StyledTableHeader key={headerGroup.id}>
      {headerGroup.headers.map((header) => (
        <TableCell key={header.id} colSpan={header.colSpan}>
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
                <TableSort column={header.column} />
              )}
            </div>
          )}
        </TableCell>
      ))}
    </StyledTableHeader>
  ));

  const rows = table.getRowModel().rows.map((row) => (
    <StyledTableRow key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </StyledTableRow>
  ));

  const { mutateAsync: createNewReport } = useCreateNewReport();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <SubHeader
        title="Assignment Management"
        subtitle="In this section, you can submit and view assignments for your courses. You can create new assignments, track student submissions, and manage assignment deadlines and grading."
      />
      <MainWrapperWithSubHeader $containerWidth="L">
        <Stack mb={3} direction="row" justifyContent="flex-end">
          <ButtonComponent
            disabled={
              activeInitiative?.initiativeStatus?.toLowerCase() === 'concluded'
            }
            customVariant="primary-m"
            startIcon={<PlusIcon />}
            onClick={() => createNewReport()}
          >
            Create assignment
          </ButtonComponent>
        </Stack>
        {isLoading ? (
          <SkeletonComponent />
        ) : (
          <ShadowContainerWithTopPadding>
            <Stack spacing={4}>
              <FormSection
                title={activeInitiative?.name}
                variant={activeInitiative?.initiativeStatus}
                isMandatory={true}
              />
              <TableComponent headerGroups={headerGroups} rows={rows} />
            </Stack>
          </ShadowContainerWithTopPadding>
        )}
      </MainWrapperWithSubHeader>
      <FormModal
        modalSubtitle="Are you sure you want to delete this draft assignment?"
        content={`You're about to permanently delete this assignment. This action cannot be undone.`}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          setIsDeleteModalOpen(false);
          deleteProgressReporting(reportToDelete);
        }}
      />
      {reportToView && (
        <ViewReportModal
          reportId={reportToView}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
}
