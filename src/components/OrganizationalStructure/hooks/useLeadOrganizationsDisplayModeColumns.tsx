import { useMemo } from "react";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import type { TleadOrganization } from "@app/types";

export function useLeadOrganizationsDisplayModeColumns() {
  const columnHelper = createColumnHelper<TleadOrganization>();

  return useMemo<ColumnDef<TleadOrganization, any>[]>(
    () => [
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
        meta: { width: "27.5%" },
      }),
      columnHelper.accessor("country", {
        header: "Country",
        cell: (info) => info.getValue(),
        sortingFn: "alphanumeric",
        meta: { width: "27.5%" },
      }),
      columnHelper.accessor("assignedRoles", {
        header: "Assigned role(s)",
        cell: (info) => {
          const v = info.getValue();
          return Array.isArray(v) ? v.join(", ") : (v ?? "");
        },
        sortingFn: "alphanumeric",
        meta: { width: "25%" },
      }),
    ],
    [],
  );
}
