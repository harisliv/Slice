import { type Table } from '@tanstack/react-table';
import { Stack } from '@mui/material';
import { PlusIcon } from '@app/lib/icons';
import { ButtonComponent } from '@app/lib/ui';
import ExportActions from './ExportActions';
import ColumnVisibilityActions from './ColumnVisibilityActions';
import type { VisibilityState } from '@tanstack/react-table';
import SmartDropdown from '@app/components/SmartDropdown';
import {
  isParticipantCreationData,
  type TMyParticipants,
  type SmartDropdownData
} from '@app/types';
import { useUpdateParticipant, useMyParticipants } from '@app/hooks';
import { useState } from 'react';

interface TableActionsProps {
  table: Table<TMyParticipants>;
  hasActiveFilters: boolean;
  visibility: VisibilityState;
  setVisibility: (
    updaterOrValue:
      | VisibilityState
      | ((old: VisibilityState) => VisibilityState)
  ) => void;
}
export default function TableActions({
  table,
  hasActiveFilters,
  visibility,
  setVisibility
}: TableActionsProps) {
  const [openSmartDd, setOpenSmartDd] = useState<boolean>(false);
  const { mutateAsync: updateParticipant } = useUpdateParticipant();
  const { selectOptions } = useMyParticipants();

  const handleSubmit = async (item: SmartDropdownData) => {
    if (isParticipantCreationData(item)) {
      await updateParticipant(item);
    }
  };

  return (
    <Stack
      mb={1}
      mt={3}
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems={{ xs: 'left', sm: 'center' }}
    >
      <ButtonComponent
        customVariant="primary-m"
        title="Add Participants"
        startIcon={<PlusIcon />}
        onClick={() => setOpenSmartDd(true)}
      >
        {'Add Participants'}
      </ButtonComponent>
      <SmartDropdown
        schemaType="participantCreation"
        open={openSmartDd}
        onClose={() => setOpenSmartDd(false)}
        title="Add participants manually"
        submitLabel="Add participants"
        addAnotherLabel="Add another participant"
        canAddMore={true}
        onSubmit={handleSubmit}
        selectOptions={selectOptions}
      />

      <Stack direction={{ xxs: 'column', xs: 'row', sm: 'row' }} spacing={2}>
        <ExportActions table={table} hasActiveFilters={hasActiveFilters} />
        <ColumnVisibilityActions
          visibility={visibility}
          setVisibility={setVisibility}
        />
      </Stack>
    </Stack>
  );
}
