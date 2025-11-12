import { useState } from 'react';
import { FormInputDescription } from '@app/components';
import { INITIATIVE_INFORMATION_FIELD_INFO } from '@app/constants';
import SmartDropdown from '@app/components/SmartDropdown';
import { Stack } from '@mui/material';
import { Theme } from '@app/lib/general';
import { PlusIcon } from '@app/lib/icons';
import { ButtonComponent, RemovableItem } from '@app/lib/ui';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  isContactOrganizationData,
  type InitiativeProfileFormData,
  type SmartDropdownData
} from '@app/types';
import { useDeleteModal } from '@app/hooks';

const MAX_ORGS = 3;

export default function ContactOrganization() {
  const { showDeleteModal } = useDeleteModal();
  const { control, watch } = useFormContext<InitiativeProfileFormData>();
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'contactOrganizations',
    rules: { maxLength: MAX_ORGS }
  });

  const contactOrganizations = watch('contactOrganizations');
  const [openSmartDd, setOpenSmartDd] = useState(false);

  const handleSubmit = (item: SmartDropdownData) => {
    if (isContactOrganizationData(item)) {
      append({ label: item.name, value: item.id ?? '' });
    }
  };

  const openRemoveModal = (index: number) => {
    const orgName = fields[index]?.label ?? 'this organization';
    showDeleteModal({
      subtitle: 'Are you sure you want to delete this organization?',
      content: `You're about to permanently delete "${orgName}". This cannot be undone.`,
      onConfirm: () => remove(index)
    });
  };

  const canRemoveAny = fields.length <= 1;

  return (
    <Stack spacing={2}>
      <FormInputDescription
        title={INITIATIVE_INFORMATION_FIELD_INFO.contactOrganizations.title}
        subtitle={
          INITIATIVE_INFORMATION_FIELD_INFO.contactOrganizations.subtitle
        }
      />

      {fields?.map((field, idx) => (
        <RemovableItem
          disabled={canRemoveAny}
          key={field.id ?? idx}
          label={field?.label ?? '-'}
          onRemove={() => openRemoveModal(idx)}
          icon="trash"
        />
      ))}

      <ButtonComponent
        onClick={() => setOpenSmartDd(true)}
        customVariant="terciary-m"
        startIcon={<PlusIcon fill={Theme.palette.primary.azur} />}
        disabled={fields.length >= MAX_ORGS}
      >
        Add organization
      </ButtonComponent>

      <SmartDropdown
        schemaType="contactOrganization"
        open={openSmartDd}
        onClose={() => setOpenSmartDd(false)}
        title="Add contact organization"
        submitLabel="Add"
        addAnotherLabel="Add another organization"
        canAddMore={fields.length < MAX_ORGS - 1}
        onSubmit={handleSubmit}
        selectOptions={contactOrganizations}
      />
    </Stack>
  );
}
