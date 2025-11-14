import { useMemo } from 'react';
import { Stack } from '@mui/material';
import { ButtonComponent, Modal } from '@app/lib/ui';

import {
  ControlledAutocomplete,
  ControlledSelectWithDropdown
} from '@app/components/ControlledInput';
import FormInputDescription from '@app/components/FormInputDescription';
import {
  useAddInitiativeConfirmationModal,
  useActiveInitiative,
  useInitiatives
} from '@app/hooks';
import type {
  RelatedInitiative,
  TempModalPayload,
  DropdownOption
} from '@app/types';

export type AddInitiativeModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (tempOption: TempModalPayload) => void;
  relativeInitiatives: RelatedInitiative[];
  disabled: boolean;
  onClear: () => void;
};

export default function AddInitiativeModal({
  open,
  onClose,
  onConfirm,
  relativeInitiatives,
  disabled,
  onClear
}: AddInitiativeModalProps) {
  const { activeInitiative } = useActiveInitiative();
  const { data: initiatives = [] } = useInitiatives();

  const { showAddInitiativeConfirmationModal } =
    useAddInitiativeConfirmationModal({
      onConfirm
    });

  // Transform initiatives from Supabase to dropdown options, filtering out active initiative
  const initiativeDropdownOptions: DropdownOption[] = useMemo(
    () =>
      initiatives
        .filter((initiative) => initiative.id !== activeInitiative?.id)
        .map((initiative) => ({
          label: initiative.name,
          value: initiative.id
        })),
    [initiatives, activeInitiative?.id]
  );

  const filteredOptions = useMemo(
    () =>
      initiativeDropdownOptions
        .filter(
          (option) =>
            !relativeInitiatives.some(
              (i) => i.relatedInitiativeId === option.value
            )
        )
        .map((o) => ({
          name: o.label,
          id: o.value
        })),
    [relativeInitiatives, initiativeDropdownOptions]
  );

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        modalTitle={'Add course'}
        $width="640px"
        footerChildren={
          <>
            <ButtonComponent
              customVariant="secondary-m"
              type="button"
              onClick={onClose}
            >
              Cancel
            </ButtonComponent>
            <ButtonComponent
              customVariant="primary-m"
              type="button"
              disabled={disabled}
              onClick={showAddInitiativeConfirmationModal}
            >
              Confirm course
            </ButtonComponent>
          </>
        }
      >
        <Stack spacing={3} overflow={'auto hidden'}>
          <FormInputDescription title="Select Course" required />

          <ControlledAutocomplete
            name="tempOption"
            inputDescriptionTitle={'Select Course'}
            required
            options={filteredOptions}
            onClear={onClear}
          />

          <FormInputDescription title="Select relationship" required />

          <ControlledSelectWithDropdown
            name={'tempRelationshipType'}
            inputDescriptionTitle={'Select Relationship'}
            label={'Select Relationship'}
            dropdownEnpoint="CciRelationType"
            required
          />
        </Stack>
      </Modal>
    </>
  );
}
