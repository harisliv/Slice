import { useFieldArray, useFormContext } from 'react-hook-form';
import { ButtonComponent, CustomAccordion } from '@app/lib/ui';
import { Divider, Stack } from '@mui/material';
import { PlusIcon } from '@app/lib/icons';
import ActionTitle from './components/ActionTitle';
import ActionDescription from './components/ActionDescription';
import TypeOfAction from './components/TypeOfAction';
import AssociatedTargets from './components/AssociatedTargets';
import ActionImpact from './components/ActionImpact';
import ActionMultilateralProcess from './components/ActionMultilaternalProcess';
import { Theme } from '@app/lib/general';
import { defaultActionValues, type ActionFormData } from '@app/types';
import Outcomes from './components/Outcomes';
import OutcomesUrl from './components/OutcomesUrl';
import { useDeleteModal } from '@app/hooks';

export default function ActionsOutcomesAndImpacts() {
  const { showDeleteModal } = useDeleteModal();
  const { control, watch } = useFormContext<ActionFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'actions',
    rules: {
      maxLength: 7
    }
  });

  const actions = watch('actions');

  const appendAction = () => {
    append(defaultActionValues.actions[0]);
  };

  const openRemoveModal = (index: number) => {
    const title = actions?.[index]?.title?.trim() || 'this action';
    showDeleteModal({
      subtitle: 'Are you sure you want to delete this action?',
      content: `You're about to permanently delete ${title}. This cannot be undone.`,
      onConfirm: () => remove(index)
    });
  };

  return (
    <Stack spacing={2} paddingBottom={1}>
      {fields.map((field, actionIndex) => (
        <CustomAccordion
          defaultExpanded={actionIndex === 0}
          title={`Action ${actionIndex + 1}`}
          onActionClick={() => openRemoveModal(actionIndex)}
          key={field.id}
          withDelete
        >
          <Stack spacing={3} paddingBottom={2}>
            <ActionTitle index={actionIndex} />
            <Divider />
            <ActionDescription index={actionIndex} />
            <Divider />
            <TypeOfAction index={actionIndex} />
            <Divider />
            <AssociatedTargets index={actionIndex} />
            <Divider />
            <Outcomes index={actionIndex} />
            <OutcomesUrl index={actionIndex} />
            <Divider />
            <ActionImpact index={actionIndex} />
            <Divider />
            <ActionMultilateralProcess index={actionIndex} />
          </Stack>
        </CustomAccordion>
      ))}
      <ButtonComponent
        onClick={appendAction}
        customVariant="terciary-m"
        startIcon={<PlusIcon fill={Theme.palette.primary.azur} />}
        disabled={fields.length >= 7}
      >
        Add action
      </ButtonComponent>
    </Stack>
  );
}
