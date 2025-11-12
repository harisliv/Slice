// useRelatedInitiativesDisplayColumns.tsx
import { useMemo } from 'react';
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import type { RelatedInitiative } from '@app/types';
import { Stack } from '@mui/material';

function ContactStack({
  name,
  email
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

export function useRelatedInitiativesDisplayModeColumns() {
  const columnHelper = createColumnHelper<RelatedInitiative>();

  return useMemo<ColumnDef<RelatedInitiative, any>[]>(
    () => [
      columnHelper.accessor('relatedInitiativeName', {
        id: 'name',
        header: 'Cooperative climate initiative name',
        cell: (info) => info.getValue(),
        sortingFn: 'alphanumeric',
        meta: { width: '23.5%' }
      }),
      columnHelper.accessor('relationshipType', {
        id: 'rel',
        header: 'Relationship of the initiative to your initiative',
        cell: (info) => info.getValue(),
        sortingFn: 'alphanumeric',
        meta: { width: '35.5%' }
      }),
      columnHelper.display({
        id: 'contact',
        header: 'Contact information',
        enableSorting: false,
        meta: { width: '20.5%' },
        cell: (info) => {
          const { contactName, contactEmail } = info.row.original;
          return <ContactStack name={contactName} email={contactEmail} />;
        }
      }),
      columnHelper.accessor('validationStatus', {
        id: 'status',
        header: 'Validation status',
        cell: (info) => info.getValue(),
        sortingFn: 'alphanumeric',
        meta: { width: '20.5%' }
      })
    ],
    []
  );
}
