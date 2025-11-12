import { useState } from 'react';
import FormInputDescription from '@app/components/FormInputDescription';
import SmartDropdown from '@app/components/SmartDropdown';
import { ORGANIZATIONAL_STRUCTURE_FIELD_INFO } from '@app/constants';
import { ButtonComponent } from '@app/lib/ui';
import { PlusIcon } from '@app/lib/icons';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  isLeadOrganizationsData,
  type InvolvedEntitiesFormData,
  type SmartDropdownData
} from '@app/types';
import { GenericTable } from '@app/components';

import { useDeleteModal } from '@app/hooks';
import { useLeadOrganizationsEditModeColumns } from '@app/components/OrganizationalStructure/hooks';

export const MAX_LEAD_ORGANIZATIONS = 5;

export default function LeadOrganizationsFiscalSponsorsFunders() {
  const { showDeleteModal } = useDeleteModal();
  const { control, watch } = useFormContext<InvolvedEntitiesFormData>();

  const { append, remove } = useFieldArray({
    control,
    name: 'leadOrganizations'
  });

  const leadOrganizations = watch('leadOrganizations');

  const [openSmartDd, setOpenSmartDd] = useState(false);

  const selectOptions = leadOrganizations.map(({ id, name }) => ({
    label: name,
    value: id ?? ''
  }));

  const handleOnRemove = (entityId: string) => {
    const toRemoveIdx = leadOrganizations.findIndex(
      (org) => org.id === entityId
    );

    if (toRemoveIdx === -1) return;

    const name = leadOrganizations[toRemoveIdx]?.name;
    showDeleteModal({
      subtitle: 'Are you sure you want to remove this entity?',
      content: `You are about to remove "${name}". You can revoke this decision by exiting the edit mode without  submitting changes. Once you submit changes, the relationship with "${name}" will be permanently removed.`,
      onConfirm: () => remove(toRemoveIdx)
    });
  };

  const handleAddEntity = (item: SmartDropdownData) => {
    if (isLeadOrganizationsData(item)) {
      append({
        id: item.id,
        name: item.name,
        type: item.type,
        country: item.country,
        assignedRoles: item.assignedRoles
      });
    }
  };

  const columns = useLeadOrganizationsEditModeColumns({
    actions: {
      onRemove: handleOnRemove
    }
  });

  return (
    <>
      <FormInputDescription
        title={ORGANIZATIONAL_STRUCTURE_FIELD_INFO.leadOrganizations.title}
        subtitle={
          ORGANIZATIONAL_STRUCTURE_FIELD_INFO.leadOrganizations.subtitle
        }
      />

      <ButtonComponent
        customVariant="primary-m"
        startIcon={<PlusIcon />}
        onClick={() => setOpenSmartDd(true)}
      >
        Add entity
      </ButtonComponent>

      {leadOrganizations?.length > 0 && (
        <GenericTable columns={columns} data={leadOrganizations} />
      )}

      <SmartDropdown
        schemaType="leadOrganizations"
        open={openSmartDd}
        onClose={() => setOpenSmartDd(false)}
        title="Add entity"
        submitLabel="Add entity"
        canAddMore={false}
        onSubmit={handleAddEntity}
        selectOptions={selectOptions}
      />
    </>
  );
}
