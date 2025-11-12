import { ButtonComponent, Modal } from '@app/lib/ui';
import { ControlledInput } from '@app/components';
import { useFieldArray, useFormContext } from 'react-hook-form';
import ProgressReportUpload from './ProgressReportUpload';
import { Stack } from '@mui/material';
import { NumericControlledInput } from '@app/components/ControlledInput';
import {
  isReportFormData,
  type GoalsTargetsAndMonitoringShape
} from '@app/types';
import { MONITORING_FIELD_INFO } from '@app/constants';

interface TargetFieldsModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fieldIndex: number;
}

export default function AddProgressReportModal({
  isModalOpen,
  setIsModalOpen,
  fieldIndex
}: TargetFieldsModalProps) {
  const { control } = useFormContext();

  const { remove } = useFieldArray({
    control,
    name: 'periodicalProgressReport'
  });

  const handleClose = () => {
    setIsModalOpen(false);
  };
  const { watch } = useFormContext<GoalsTargetsAndMonitoringShape>();

  const periodicalProgressReport = watch(
    `periodicalProgressReport.${fieldIndex}`
  );

  const isValid = isReportFormData(periodicalProgressReport);

  return (
    <Modal
      keepMounted={false}
      modalTitle="Add new progress report"
      onClose={() => {
        remove(fieldIndex);
        handleClose();
      }}
      open={isModalOpen}
      $width="720px"
      footerChildren={
        <>
          <ButtonComponent
            onClick={() => {
              remove(fieldIndex);
              handleClose();
            }}
            customVariant="secondary-m"
          >
            Return
          </ButtonComponent>
          {/* TODO disable */}
          <ButtonComponent
            customVariant="primary-m"
            onClick={handleClose}
            disabled={!isValid}
          >
            Submit report
          </ButtonComponent>
        </>
      }
    >
      <Stack spacing={4}>
        <ProgressReportUpload fieldIndex={fieldIndex} />

        <ControlledInput
          name={`periodicalProgressReport.${fieldIndex}.title`}
          required
          inputDescriptionTitle={MONITORING_FIELD_INFO.report.title.title}
          inputDescriptionSubtitle={MONITORING_FIELD_INFO.report.title.subtitle}
          helperText={MONITORING_FIELD_INFO.report.title.helper}
        />
        <NumericControlledInput
          name={`periodicalProgressReport.${fieldIndex}.year`}
          required
          inputDescriptionTitle={MONITORING_FIELD_INFO.report.year.title}
          inputDescriptionSubtitle={MONITORING_FIELD_INFO.report.year.subtitle}
          helperText={MONITORING_FIELD_INFO.report.year.helper}
        />
      </Stack>
    </Modal>
  );
}
