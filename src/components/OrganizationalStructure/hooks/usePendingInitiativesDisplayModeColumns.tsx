// usePendingInitiativesDisplayColumns.tsx
import { useMemo } from "react";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import type { RelatedInitiative } from "@app/types";

export function usePendingInitiativesDisplayModeColumns() {
  const columnHelper = createColumnHelper<RelatedInitiative>();

  return useMemo<ColumnDef<RelatedInitiative, any>[]>(
    () => [
      columnHelper.accessor("relatedInitiativeName", {
        id: "name",
        header: "Cooperative climate initiative name",
        cell: (info) => info.getValue(),
        sortingFn: "alphanumeric",
        meta: { width: "23.5%" },
      }),
      columnHelper.accessor("relationshipType", {
        id: "rel",
        header: "Potential relationship of the initiative to your initiative",
        cell: (info) => info.getValue(),
        sortingFn: "alphanumeric",
        meta: { width: "35.5%" },
      }),
      columnHelper.accessor("contactName", {
        id: "fpn",
        header: "Focal point requesting Name",
        cell: (info) => info.getValue() ?? "",
        sortingFn: "alphanumeric",
        meta: { width: "20.5%" },
      }),
      columnHelper.accessor("contactEmail", {
        id: "fpe",
        header: "Focal point requesting Email",
        cell: (info) => {
          const email = info.getValue() as string | null | undefined;
          return email ? <span>{email}</span> : "—";
        },
        sortingFn: "alphanumeric",
        meta: { width: "20.5%" },
      }),
    ],
    [],
  );
}
