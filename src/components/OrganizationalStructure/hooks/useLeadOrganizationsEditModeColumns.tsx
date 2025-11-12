import { useMemo } from "react";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import type { TleadOrganization } from "@app/types";
import { IconButton } from "@app/lib/ui";
import { TrashBinIcon } from "@app/lib/icons";
import { Grid2 } from "@mui/material";

type Ctx = {
  actions: { onRemove?: (id: string) => void };
};

export function useLeadOrganizationsEditModeColumns(ctx?: Ctx) {
  const columnHelper = createColumnHelper<TleadOrganization>();

  return useMemo<ColumnDef<TleadOrganization, any>[]>(() => {
    return [
      columnHelper.accessor("name", {
        header: "Entity operating name",
        cell: (info) => info.getValue(),
        sortingFn: "alphanumeric",
        meta: { width: "20%" },
      }),
      columnHelper.accessor("type", {
        header: "Type",
        cell: (info) => info.getValue() ?? "",
        sortingFn: "alphanumeric",
        meta: { width: "25%" },
      }),
      columnHelper.accessor("country", {
        header: "Country",
        cell: (info) => info.getValue() ?? "",
        sortingFn: "alphanumeric",
        meta: { width: "20%" },
      }),
      columnHelper.accessor("assignedRoles", {
        header: "Role",
        cell: (info) => {
          const v = info.getValue();
          if (Array.isArray(v)) return v.join(", ");
          return v ?? "";
        },
        sortingFn: "alphanumeric",
        meta: { width: "20%" },
      }),
      columnHelper.display({
        header: "Remove",
        enableSorting: false,
        meta: { width: "15%" },
        cell: (info) => {
          const row = info.row.original;
          const rowId = row.id ?? "";

          const onToggle = () => {
            ctx?.actions?.onRemove?.(rowId);
          };

          return (
            <Grid2 container alignItems="center" justifyContent="center">
              <IconButton
                size="small"
                color="error"
                aria-label="remove"
                onClick={onToggle}
              >
                <TrashBinIcon />
              </IconButton>
            </Grid2>
          );
        },
      }),
    ];
  }, [ctx?.actions?.onRemove]);
}
