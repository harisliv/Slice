import { useMemo } from 'react';
import { type Table } from '@tanstack/react-table';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import { useDropdownValues } from './useDropdownValues';
import { dateFormat } from '../components/MyParticipants/MyParticipants.types';
import type { TMyParticipants } from '@app/types';

interface UseExcelExportProps {
  table: Table<TMyParticipants>;
  excludeColumnId?: string;
}

export const useExcelExport = ({
  table,
  excludeColumnId = 'selectForRemoval'
}: UseExcelExportProps) => {
  const { mappedData } = useDropdownValues('Countries');
  const { mappedData: businessActivities } =
    useDropdownValues('BusinessActivities');

  const processRowData = useMemo(() => {
    return (row: any, columns: any[]) => {
      const rowData: Record<string, any> = {};

      columns.forEach((col) => {
        const columnId = col.id;
        const cellValue = row.getValue(columnId);

        if (columnId === 'country') {
          rowData[col.columnDef.header as string] =
            mappedData[cellValue as string];
        } else if (columnId === 'dateJoined') {
          if (!!cellValue) {
            const formattedCellValue = dayjs(cellValue as string).format(
              dateFormat
            );
            rowData[col.columnDef.header as string] = formattedCellValue;
          } else {
            rowData[col.columnDef.header as string] = cellValue;
          }
        } else if (columnId === 'businessActivity') {
          rowData[col.columnDef.header as string] =
            businessActivities[cellValue as string];
        } else {
          rowData[col.columnDef.header as string] = cellValue;
        }
      });

      return rowData;
    };
  }, [mappedData, businessActivities]);

  const handleExportFilteredTableToExcel = () => {
    const visibleColumns = table
      .getVisibleLeafColumns()
      .filter((col) => col.id !== excludeColumnId);

    const processedRows = table.getRowModel().rows;
    const dataForExcel = processedRows.map((row) =>
      processRowData(row, visibleColumns)
    );

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Export');
    XLSX.writeFile(workbook, 'table-export.xlsx');
  };

  const handleExportAllDataToExcel = () => {
    const allColumns = table
      .getAllLeafColumns()
      .filter((col) => col.id !== excludeColumnId);

    const allRows = table.getCoreRowModel().rows;
    const dataForExcel = allRows.map((row) => processRowData(row, allColumns));

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'All Data Export');
    XLSX.writeFile(workbook, 'full-table-export.xlsx');
  };

  return {
    handleExportFilteredTableToExcel,
    handleExportAllDataToExcel
  };
};
