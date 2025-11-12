import FormInputDescription from '@app/components/FormInputDescription';
import { INITIATIVE_INFORMATION_FIELD_INFO } from '@app/constants';
import Grid2 from '@mui/material/Grid2';
import { ControlledUploader } from '@app/components/ControlledInput';
import { useFormContext } from 'react-hook-form';
import type { InitiativeInformationFormData } from '@app/types';

export default function LogoUploader() {
  const { watch } = useFormContext<InitiativeInformationFormData>();
  const logoBase64 = watch('logoBase64');

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <FormInputDescription
          title={INITIATIVE_INFORMATION_FIELD_INFO.logoBase64.title}
          subtitle={INITIATIVE_INFORMATION_FIELD_INFO.logoBase64.subtitle}
        />
      </Grid2>
      <Grid2 size={6}>
        <ControlledUploader
          fileMaxSize={1 * 1024 * 1024}
          name="logoBase64"
          accept={{
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png']
          }}
          type="Initiative"
          serverValue={{
            url: logoBase64,
            name: 'logo.jpg',
            size: logoBase64?.length || 0,
            id: null,
            sharePointId: null
          }}
        />
      </Grid2>
    </Grid2>
  );
}
