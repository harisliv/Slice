// useRelatedInitiativesEditColumns.tsx
import { useMemo } from "react";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import type { RelatedInitiative } from "@app/types";
import { Grid2, Stack } from "@mui/material";
import { IconButton } from "@app/lib/ui";
import { TrashBinIcon } from "@app/lib/icons";
import { useRemovalConfirmationModal } from "@app/hooks";

function ContactStack({
  name,
  email,
}: {
  name?: string | null;
  email?: string | null;
}) {
  if (!name && !email) return <span>—</span>;
  return (
    <Stack spacing={0.25}>
      {name ? <span>{name}</span> : null}
      {email ? <span>{email}</span> : null}
    </Stack>
  );
}

type Props = {
  removeRow: (id: string) => void;
};

export function useRelatedInitiativesEditModeColumns({ removeRow }: Props) {
  const columnHelper = createColumnHelper<RelatedInitiative>();
  const { showRemovalConfirmationModal } = useRemovalConfirmationModal({
    onConfirm: removeRow,
  });

  return useMemo<ColumnDef<RelatedInitiative, any>[]>(
    () => [
      columnHelper.accessor("relatedInitiativeName", {
        header: "Cooperative climate initiative name",
        cell: (info) => info.getValue(),
        sortingFn: "alphanumeric",
        meta: { width: "20%" },
      }),
      columnHelper.accessor("relationshipType", {
        header: "Relationship of the initiative to your initiative",
        cell: (info) => info.getValue(),
        sortingFn: "alphanumeric",
        meta: { width: "30%" },
      }),
      columnHelper.display({
        header: "Contact information",
        enableSorting: false,
        meta: { width: "25%" },
        cell: (info) => {
          const { contactName, contactEmail } = info.row.original;
          return <ContactStack name={contactName} email={contactEmail} />;
        },
      }),
      columnHelper.accessor("validationStatus", {
        header: "Validation status",
        cell: (info) => info.getValue(),
        sortingFn: "alphanumeric",
        meta: { width: "15%" },
      }),
      columnHelper.display({
        header: "Select for removal",
        enableSorting: false,
        meta: { width: "10%" },
        cell: (info) => {
          const rowId = info.row.original.id;
          const initiativeName = info.row.original.relatedInitiativeName;
          return (
            <Grid2 container alignItems="center" justifyContent="center">
              <IconButton
                size="small"
                color="primary"
                aria-label="remove"
                onClick={() =>
                  showRemovalConfirmationModal?.(
                    rowId ?? "",
                    initiativeName ?? "",
                  )
                }
              >
                <TrashBinIcon />
              </IconButton>
            </Grid2>
          );
        },
      }),
    ],
    [removeRow],
  );
}
