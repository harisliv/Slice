import Grid from "@mui/material/Grid2";
import {
  CustomTag,
  Header3,
  Paragraph,
  ShadowContainerWithTopPadding,
} from "@app/lib/ui";
import { MainWrapperWithHeader } from "@app/lib/ui";
import { Stack } from "@mui/material";
import { useActiveInitiative, useMultiStepFormValues } from "@app/hooks";
import { FormStepperWithContext } from "@app/components";
import { type TProgressReportingShape } from "@app/types";
import { formatDateTime } from "@app/utils";
import RenderSteps from "./RenderSteps";

export default function CreateReportContent() {
  const { draftLatestUpdate } =
    useMultiStepFormValues<TProgressReportingShape>();

  const { activeInitiative } = useActiveInitiative();

  return (
    <MainWrapperWithHeader $containerWidth="XL" $withFooter={true}>
      <Grid container spacing={2}>
        <Grid size={{ sm: 3, xs: 12, xxs: 12 }}>
          <Stack spacing={4}>
            <div>
              <Header3>Create report</Header3>
              <Header3 variant="bold">{activeInitiative?.name}</Header3>
            </div>
            {draftLatestUpdate && (
              <Stack spacing={1}>
                <CustomTag variant="DRAFT" />
                <Paragraph variant="small-regular">
                  Latest update: {formatDateTime(draftLatestUpdate)}
                </Paragraph>
              </Stack>
            )}
            <FormStepperWithContext mode="serial" />
          </Stack>
        </Grid>
        <Grid size={{ sm: 9, xs: 12, xxs: 12 }}>
          <ShadowContainerWithTopPadding>
            <RenderSteps />
          </ShadowContainerWithTopPadding>
        </Grid>
      </Grid>
    </MainWrapperWithHeader>
  );
}
