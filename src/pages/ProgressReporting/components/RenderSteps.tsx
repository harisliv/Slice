import { useCurrentStep } from "@app/hooks/useFormStepper";
import { FormSection, ButtonComponent, Paragraph } from "@app/lib/ui";
import { Stack } from "@mui/material";
import {
  ActionsOutcomesAndImpacts,
  TimeframeOfInformation,
  ProgressOfTargets,
  ChallengesAndOpportunities,
  ReviewAndSubmission,
} from "@app/components";
import { CREATE_REPORT_FIELD_INFO } from "@app/constants";
import { DownloadExportIcon } from "@app/lib/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportPDF from "@app/components/CreateReport/Report/ReportPDF";
import { useMultiStepFormValues, useActiveInitiative } from "@app/hooks";
import type { TProgressReportingShape } from "@app/types";
import { defaultProgressReportingFormValues } from "@app/types";
import dayjs from "dayjs";

const getStepConfigurations = (data: TProgressReportingShape) => [
  {
    step: "1",
    title: "Timeframe of information",
    subtitle: (
      <Stack spacing={3}>
        <Paragraph variant="small-regular">
          In a given submission period, CCIs are invited to report information
          on the activities they have conducted during the timeframe of
          information.
        </Paragraph>
        <Stack>
          <Paragraph variant="small-regular">
            <b>Default Timeframe of Information: </b>
            The period from 1 September to 31 August, directly preceding the
            Submission Period.
          </Paragraph>
          <Paragraph variant="small-regular">
            <b>Custom Timeframe of Information: </b>
            If a CCI cannot apply the Default Timeframe of Information, it may
            define a custom Timeframe of Information. The Custom Timeframe of
            Information shall be 12 months in duration and shall not overlap
            with a previous Timeframe of Information.
          </Paragraph>
        </Stack>
      </Stack>
    ),
    content: <TimeframeOfInformation />,
    hasRequiredLabel: true,
  },
  {
    step: "2",
    title: CREATE_REPORT_FIELD_INFO.actions.title,
    subtitle: CREATE_REPORT_FIELD_INFO.actions.subtitle,
    content: <ActionsOutcomesAndImpacts />,
    hasRequiredLabel: true,
  },
  {
    step: "3",
    title: "Progress of targets",
    subtitle:
      "In this section, you should provide information on the progress of the targets set by the initiative.",
    content: <ProgressOfTargets />,
    hasRequiredLabel: true,
  },
  {
    step: "4",
    title: "Challenges and opportunities",
    subtitle:
      "In this section, you should provide information on the challenges faced and opportunities identified by the initiative.",
    content: <ChallengesAndOpportunities />,
    hasRequiredLabel: true,
  },
  {
    step: "5",
    title: "Review and submission",
    subtitle: undefined,
    content: <ReviewAndSubmission data={data} />,
    hasRequiredLabel: false,
  },
];

export default function RenderSteps() {
  const currentStep = useCurrentStep();
  const { activeInitiative } = useActiveInitiative();
  const savedFormData = useMultiStepFormValues<TProgressReportingShape>();

  const fullData: TProgressReportingShape = {
    ...defaultProgressReportingFormValues,
    ...savedFormData,
    actions:
      savedFormData.actions?.map((action) => ({
        ...action,
        associatedTargets: action.associatedTargets?.map((target) => target),
      })) || [],
  };

  const stepConfigurations = getStepConfigurations(fullData);
  const currentStepConfig = stepConfigurations[currentStep];

  if (!currentStepConfig) {
    return <div>Unknown Step</div>;
  }

  const getHeaderChildren = () => {
    if (currentStep === 4) {
      const fileName = `${activeInitiative?.name.replace(
        / /g,
        "-",
      )}_Progress_${dayjs().year()}.pdf`;

      return (
        <PDFDownloadLink
          key={Date.now()}
          document={<ReportPDF data={fullData} />}
          fileName={fileName}
        >
          {({ loading }) => (
            <ButtonComponent
              startIcon={<DownloadExportIcon />}
              customVariant="terciary-m"
              disabled={loading}
            >
              Download as a PDF
            </ButtonComponent>
          )}
        </PDFDownloadLink>
      );
    }
    return null;
  };

  return (
    <Stack spacing={2}>
      <FormSection
        isMandatory={currentStepConfig.hasRequiredLabel}
        step={currentStepConfig.step}
        title={currentStepConfig.title}
        subtitle={currentStepConfig.subtitle}
        headerChildren={getHeaderChildren()}
      >
        {currentStepConfig.content}
      </FormSection>
    </Stack>
  );
}
