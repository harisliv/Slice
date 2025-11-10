import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  defaultTargetValues,
  type GoalsTargetsAndMonitoringShape
} from '@app/types';
import { ButtonComponent, Paragraph } from '@app/lib/ui';
import { Box, Stack } from '@mui/material';
import { PlusIcon } from '@app/lib/icons';
import TargetFieldsModal from './components/TargetFieldsModal';
import TargetDisplayItem from './components/TargetDisplayItem';
import { useState } from 'react';
import { useCreateModal, useDeleteModal } from '@app/hooks';

export default function Targets() {
  const { showDeleteModal } = useDeleteModal();
  const { showCreateModal } = useCreateModal();
  const { control, watch } = useFormContext<GoalsTargetsAndMonitoringShape>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'newTargets',
    rules: {
      maxLength: 7
    }
  });

  const newTargets = watch('newTargets');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDeleteModal = (index: number) => {
    const title = newTargets?.[index].title || 'this target';
    showDeleteModal({
      subtitle: 'Are you sure you want to delete this creaeted target?',
      content: `You're about to permanently delete "${title}". This action cannot be undone.`,
      onConfirm: () => remove(index)
    });
  };

  const startCreateFlow = () => {
    append(defaultTargetValues.targets?.[0]);
    setIsModalOpen(true);
  };

  const handleRequestCreate = () => {
    showCreateModal({
      subtitle: 'Creating a new target?',
      content: `Your are about to create a new target. You can still review or delete it before submitting changes. Once you submit changes, target(s) will not be able to edit, and the CCI will be requested to report its progress through the annual progress tracking procedure.`,
      onConfirm: () => setIsModalOpen(false)
    });
  };

  return (
    <Stack spacing={2} paddingBottom={1}>
      <Box>
        <Paragraph variant="large-bold">Create new target</Paragraph>
        <Paragraph>
          Targets are action milestones of the Initiative that contribute to its
          climate-related goal. Initiatives are invited and encouraged to set
          target(s). Initiatives will also be required to report the progress of
          the target(s) they have set, through the annual progress reporting
          process.
        </Paragraph>
      </Box>
      {newTargets?.length > 0 &&
        newTargets?.map((target, targetIndex) => (
          <TargetDisplayItem
            isEditMode={true}
            key={target.id ?? targetIndex}
            target={target}
            onActionClick={() => openDeleteModal(targetIndex)}
            showSecondTable={false}
          />
        ))}
      <ButtonComponent
        onClick={startCreateFlow}
        customVariant="primary-m"
        startIcon={<PlusIcon />}
      >
        Create new target
      </ButtonComponent>
      {fields?.length > 0 && (
        <TargetFieldsModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          lastFieldIndex={fields?.length - 1}
          remove={() => remove(fields?.length - 1)}
          onRequestCreate={handleRequestCreate}
        />
      )}
    </Stack>
  );
}
