import FormInputDescription from '@app/components/FormInputDescription';
import { INITIATIVE_INFORMATION_FIELD_INFO } from '@app/constants';
import Grid2 from '@mui/material/Grid2';
import { ControlledUploader } from '@app/components/ControlledInput';
import { useFormContext } from 'react-hook-form';
import type { InitiativeInformationFormData } from '@app/types';

export default function ClosureReport() {
  const { watch } = useFormContext<InitiativeInformationFormData>();
  const closureReport = watch('closureReport');

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <FormInputDescription
          title={INITIATIVE_INFORMATION_FIELD_INFO.closureReport.title}
          subtitle={INITIATIVE_INFORMATION_FIELD_INFO.closureReport.subtitle}
        />
      </Grid2>
      <Grid2 size={6}>
        <ControlledUploader
          fileMaxSize={20 * 1024 * 1024}
          name="closureReport"
          type="Initiative"
          serverValue={closureReport}
          accept={{
            'application/pdf': []
          }}
        />
      </Grid2>
    </Grid2>
  );
}
