import { Grid2, TableCell } from "@mui/material";
import {
  StyledHeader2Cell,
  StyledTable2Header,
  StyledTable2Row,
  TableComponent,
  TableSort2,
} from "@app/lib/ui";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";

type Props<T> = {
  columns: ColumnDef<T, any>[];
  data: T[];
};

export default function GenericTable<T>({ columns, data }: Props<T>) {
  const table = useReactTable<T>({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableMultiSort: true,
  });

  const pickWidth = (col: any) =>
    (col?.columnDef?.meta?.width as string) ?? "auto";

  const headerGroups = table.getHeaderGroups()?.map((hg) => (
    <StyledTable2Header key={hg.id}>
      {hg.headers.map((h) => (
        <StyledHeader2Cell
          key={h.id}
          colSpan={h.colSpan}
          style={{ width: pickWidth(h.column) }}
        >
          {h.isPlaceholder ? null : (
            <Grid2
              container
              justifyContent="space-between"
              wrap="nowrap"
              alignItems="center"
              onClick={h.column.getToggleSortingHandler()}
              className={h.column.getCanSort() ? "sortable" : undefined}
            >
              {flexRender(h.column.columnDef.header, h.getContext())}
              {h.column.getCanSort() && <TableSort2 column={h.column} />}
            </Grid2>
          )}
        </StyledHeader2Cell>
      ))}
    </StyledTable2Header>
  ));

  const rowGroups = table.getRowModel().rows.map((row) => (
    <StyledTable2Row key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          style={{
            width: pickWidth(cell.column),
            padding: "4px 8px",
          }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </StyledTable2Row>
  ));

  return <TableComponent headerGroups={[headerGroups]} rows={[rowGroups]} />;
}
