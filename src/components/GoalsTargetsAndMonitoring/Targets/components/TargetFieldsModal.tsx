import Grid from '@mui/material/Grid2';
import { ButtonComponent, Modal, RequiredLabel } from '@app/lib/ui';
import { Stack } from '@mui/system';
import { ControlledInput } from '@app/components';
import {
  isTargetsSchema,
  type GoalsTargetsAndMonitoringShape
} from '@app/types';
import { useFormContext } from 'react-hook-form';
import {
  ControlledSelectWithDropdown,
  NumericControlledInput
} from '@app/components/ControlledInput';
import { CREATE_TARGET_FIELD_INFO } from '@app/constants';
import { ControlledMultiSelectWithDropdown } from '@app/components/ControlledInput';

interface TargetFieldsModalProps {
  lastFieldIndex: number;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  remove: () => void;
  onRequestCreate: () => void;
}

export default function TargetFieldsModal({
  lastFieldIndex,
  isModalOpen,
  setIsModalOpen,
  remove,
  onRequestCreate
}: TargetFieldsModalProps) {
  const handleClose = () => {
    setIsModalOpen(false);
    remove();
  };

  const { watch, trigger } = useFormContext<GoalsTargetsAndMonitoringShape>();

  const currentTarget = watch(`newTargets.${lastFieldIndex}`);

  return (
    <Modal
      keepMounted={false}
      modalTitle="Create new target"
      onClose={handleClose}
      open={isModalOpen}
      $width="720px"
      footerChildren={
        <Stack
          direction={'row'}
          gap={2}
          width={'100%'}
          justifyContent={'flex-end'}
        >
          <ButtonComponent onClick={handleClose} customVariant="secondary-m">
            Cancel
          </ButtonComponent>
          <ButtonComponent
            customVariant="primary-m"
            onClick={onRequestCreate}
            disabled={
              currentTarget && !isTargetsSchema({ targets: [currentTarget] })
            }
          >
            Create target
          </ButtonComponent>
        </Stack>
      }
    >
      <RequiredLabel
        label="Response required to continue"
        fontSize="s"
        required
        startWithStar
      />
      <Grid container rowSpacing={4} columnSpacing={2}>
        <Grid size={{ sm: 8, xs: 12, xxs: 12 }}>
          <ControlledInput
            name={`newTargets.${lastFieldIndex}.title`}
            required
            inputDescriptionTitle={CREATE_TARGET_FIELD_INFO.target.title.title}
          />
        </Grid>
        <Grid size={{ sm: 12, xs: 12, xxs: 12 }}>
          <ControlledInput
            helperText={CREATE_TARGET_FIELD_INFO.target.description.helper}
            name={`newTargets.${lastFieldIndex}.description`}
            required
            inputDescriptionTitle={
              CREATE_TARGET_FIELD_INFO.target.description.title
            }
            istextArea
          />
        </Grid>
        <Grid size={{ sm: 4, xs: 12, xxs: 12 }}>
          <ControlledSelectWithDropdown
            name={`newTargets.${lastFieldIndex}.updateTarget`}
            inputDescriptionTitle={
              CREATE_TARGET_FIELD_INFO.target.updates.title
            }
            dropdownEnpoint="Targets"
            helperText={CREATE_TARGET_FIELD_INFO.target.updates.title}
          />
        </Grid>
        <Grid size={{ sm: 4, xs: 12, xxs: 12 }}>
          <NumericControlledInput
            name={`newTargets.${lastFieldIndex}.year`}
            inputDescriptionTitle={CREATE_TARGET_FIELD_INFO.target.year.title}
            helperText={CREATE_TARGET_FIELD_INFO.target.year.helper}
            onChange={() => {
              trigger(`newTargets.${lastFieldIndex}.baseyear`);
            }}
          />
        </Grid>
        <Grid size={{ sm: 4, xs: 12, xxs: 12 }}>
          <NumericControlledInput
            name={`newTargets.${lastFieldIndex}.baseyear`}
            inputDescriptionTitle={
              CREATE_TARGET_FIELD_INFO.target.baseyear.title
            }
            helperText={CREATE_TARGET_FIELD_INFO.target.baseyear.helper}
            onChange={() => {
              trigger(`newTargets.${lastFieldIndex}.year`);
            }}
          />
        </Grid>
        <Grid size={{ sm: 8, xs: 12, xxs: 12 }}>
          <ControlledMultiSelectWithDropdown
            required
            name={`newTargets.${lastFieldIndex}.type`}
            inputDescriptionTitle={CREATE_TARGET_FIELD_INFO.target.type.title}
            dropdownEnpoint="TargetType"
            helperText={CREATE_TARGET_FIELD_INFO.target.type.help}
          />
        </Grid>
        {currentTarget?.type?.includes('Other') && (
          <Grid size={{ sm: 4, xs: 12, xxs: 12 }}>
            <ControlledInput
              name={`newTargets.${lastFieldIndex}.typeDescription`}
              inputDescriptionTitle={
                CREATE_TARGET_FIELD_INFO.target.description.title
              }
              helperText={CREATE_TARGET_FIELD_INFO.target.description.helper}
            />
          </Grid>
        )}
        <Grid container size={{ sm: 12, xs: 12, xxs: 12 }}>
          <Grid size={{ sm: 4, xs: 12, xxs: 12 }}>
            <NumericControlledInput
              helperText={CREATE_TARGET_FIELD_INFO.target.value.helper}
              name={`newTargets.${lastFieldIndex}.value`}
              inputDescriptionTitle={
                CREATE_TARGET_FIELD_INFO.target.value.title
              }
            />
          </Grid>
          <Grid size={{ sm: 4, xs: 12, xxs: 12 }}>
            <ControlledInput
              helperText={CREATE_TARGET_FIELD_INFO.target.unit.helper}
              name={`newTargets.${lastFieldIndex}.unit`}
              inputDescriptionTitle={CREATE_TARGET_FIELD_INFO.target.unit.title}
            />
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
}
