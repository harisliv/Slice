import Grid from '@mui/material/Grid2';
import {
  Header3,
  ShadowContainerWithTopPadding,
  SkeletonComponent
} from '@app/lib/ui';
import { FormStepperWithContext } from '@app/components';
import { MainWrapperWithHeader } from '@app/lib/ui';
import { useActiveInitiative, useGlobalLoading } from '@app/hooks';
import { Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import RenderSteps from './RenderSteps';

export default function EditModeMainContent() {
  const { activeInitiative } = useActiveInitiative();
  const isLoading = useGlobalLoading();
  const {
    formState: { isReady }
  } = useFormContext();

  return (
    <>
      {isLoading || !isReady ? (
        <SkeletonComponent />
      ) : (
        <MainWrapperWithHeader $containerWidth="XL" $withFooter={true}>
          <Grid container spacing={2}>
            <Grid size={{ sm: 3, xs: 12, xxs: 12 }}>
              <Stack spacing={4}>
                <div>
                  <Header3>Editing initiative profile</Header3>
                  <Header3 variant="bold">{activeInitiative?.name}</Header3>
                </div>
                <FormStepperWithContext />
              </Stack>
            </Grid>
            <Grid size={{ sm: 9, xs: 12, xxs: 12 }}>
              <ShadowContainerWithTopPadding>
                <RenderSteps />
              </ShadowContainerWithTopPadding>
            </Grid>
          </Grid>
        </MainWrapperWithHeader>
      )}
    </>
  );
}
