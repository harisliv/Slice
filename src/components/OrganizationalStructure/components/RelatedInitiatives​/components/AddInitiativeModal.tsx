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
  useDropdownValues
} from '@app/hooks';
import type { RelatedInitiative, TempModalPayload } from '@app/types';

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
  const { data: initiativeDropdownOptions = [] } =
    useDropdownValues('Initiatives');

  const { showAddInitiativeConfirmationModal } =
    useAddInitiativeConfirmationModal({
      onConfirm
    });

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
        modalTitle={'Add initiative'}
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
              Confirm initiative
            </ButtonComponent>
          </>
        }
      >
        <Stack spacing={3} overflow={'auto hidden'}>
          <FormInputDescription title="Select Initiative" required />

          <ControlledAutocomplete
            name="tempOption"
            inputDescriptionTitle={'Select Initiative'}
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
