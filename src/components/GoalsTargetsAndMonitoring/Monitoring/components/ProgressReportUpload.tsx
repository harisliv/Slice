import FormInputDescription from '@app/components/FormInputDescription';
import { MONITORING_FIELD_INFO } from '@app/constants';
import Grid2 from '@mui/material/Grid2';
import { ControlledUploader } from '@app/components/ControlledInput';
import { useFormContext } from 'react-hook-form';
import type { InitiativeProfileFormData } from '@app/types';

interface ProgressReportUploadProps {
  fieldIndex: number;
}

export default function ProgressReportUpload({
  fieldIndex
}: ProgressReportUploadProps) {
  const { watch } = useFormContext<InitiativeProfileFormData>();
  const reportValue = watch(`periodicalProgressReport.${fieldIndex}.report`);

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <FormInputDescription
          required
          title={MONITORING_FIELD_INFO.report.pdf.title}
          subtitle={MONITORING_FIELD_INFO.report.pdf.subtitle}
        />
      </Grid2>
      <Grid2 size={12}>
        <ControlledUploader
          name={`periodicalProgressReport.${fieldIndex}.report`}
          type="Initiative"
          serverValue={reportValue}
          accept={{
            'application/pdf': []
          }}
        />
      </Grid2>
    </Grid2>
  );
}
