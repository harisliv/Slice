import FormInputDescription from '@app/components/FormInputDescription';
import { INITIATIVE_INFORMATION_FIELD_INFO } from '@app/constants';
import Grid2 from '@mui/material/Grid2';
import { ControlledUploader } from '@app/components/ControlledInput';
import { useFormContext } from 'react-hook-form';
import type { InitiativeInformationFormData } from '@app/types';

export default function LogoUploader() {
  const { watch } = useFormContext<InitiativeInformationFormData>();
  const logoUrl = watch('logoUrl');

  const logoName = logoUrl
    ? logoUrl.split('/').pop() || 'logo.jpg'
    : 'logo.jpg';

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <FormInputDescription
          title={INITIATIVE_INFORMATION_FIELD_INFO.logoUrl.title}
          subtitle={INITIATIVE_INFORMATION_FIELD_INFO.logoUrl.subtitle}
        />
      </Grid2>
      <Grid2 size={6}>
        <ControlledUploader
          fileMaxSize={1 * 1024 * 1024}
          name="logoUrl"
          accept={{
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png']
          }}
          type="Initiative"
          serverValue={
            logoUrl
              ? {
                  url: logoUrl,
                  name: logoName,
                  size: null,
                  id: null,
                  sharePointId: null
                }
              : null
          }
        />
      </Grid2>
    </Grid2>
  );
}
