import {
  FunctionFocusAndThemesEditMode,
  GoalsTargetsAndMonitoring,
  InitiativeInformation,
  OrganizationalStructureEditMode
} from '@app/components';
import { useCurrentStep } from '@app/hooks/useFormStepper';
import { FormSection, RequiredLabel } from '@app/lib/ui';

const stepConfigurations = [
  {
    step: '1',
    title: 'Course information',
    subtitle:
      "In this section you can provide or update Course's profile information regarding its general information, status, and contact information.",
    content: <InitiativeInformation />
  },
  {
    step: '2',
    title: 'Learning Objectives and Assessment',
    subtitle:
      'In this section you can provide or update profile information regarding learning objectives, create assessment criteria, and provide or update profile information regarding evaluation methods.',
    content: <GoalsTargetsAndMonitoring />
  },
  {
    step: '3',
    title: 'Organizational structure',
    subtitle:
      'In this section you can provide or update profile information regarding organizational arrangements, involved entities, and related Courses.',
    content: <OrganizationalStructureEditMode />
  },
  {
    step: '4',
    title: 'Function, Focus and Themes',
    subtitle:
      'In this section you can provide or update profile information regarding functions, focuses and themes.',
    content: <FunctionFocusAndThemesEditMode />
  }
];

export default function RenderSteps() {
  const currentStep = useCurrentStep();

  const currentStepConfig = stepConfigurations[currentStep];

  if (!currentStepConfig) {
    return <div>Unknown Step</div>;
  }

  return (
    <FormSection
      step={currentStepConfig.step}
      title={currentStepConfig.title}
      subtitle={currentStepConfig.subtitle}
    >
      <RequiredLabel
        label="Response required to continue"
        startWithStar
        required
        fontSize="s"
      />
      {currentStepConfig.content}
    </FormSection>
  );
}
