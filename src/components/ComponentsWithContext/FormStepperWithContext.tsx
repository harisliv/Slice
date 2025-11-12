import { FormStepper } from "@app/lib/ui";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  useCurrentStep,
  useFormStepperActions,
  useStepStates,
} from "@app/hooks/useFormStepper";
import { useMultiStepFormActions } from "@app/hooks";
import { StepStatus } from "@app/lib/types";
import { useStepChangeModal } from "@app/hooks/Modal/variants/useStepChangeModal";
import { isEmpty } from "lodash";

export default function FormStepperWithContext({
  mode = "random",
}: {
  mode?: "serial" | "random";
}) {
  const currentStep = useCurrentStep();

  const {
    goToStep,
    toggleStepStatus,
    completeStep,
    getStepByIndex,
    uncompleteStep,
    revertToCurrentStepInitialStatus,
  } = useFormStepperActions();

  const stepStates = useStepStates();

  const goToStepAndRevertToInitialState = (stepIndex: number) => {
    revertToCurrentStepInitialStatus(currentStep);
    goToStep(stepIndex);
  };

  const { showStepChangeModal } = useStepChangeModal({
    onConfirm: goToStepAndRevertToInitialState,
  });

  const { updateFormValues } = useMultiStepFormActions();
  const {
    getValues,
    formState: { isValid, isDirty, dirtyFields },
  } = useFormContext();

  const hasDirtyFields = isDirty && !isEmpty(dirtyFields);

  const handleStepClick = (stepIndex: number) => {
    if (hasDirtyFields) {
      if (!isValid) {
        showStepChangeModal(stepIndex);
        return;
      }
      const currentFormValues = getValues();
      updateFormValues(currentFormValues);
    }
    goToStep(stepIndex);
  };

  useEffect(() => {
    if (mode === "serial") {
      const nextStep = getStepByIndex(currentStep + 1);
      // when the current step is completed, we need to toggle the next step to active if it's not completed
      if (nextStep?.status !== StepStatus.COMPLETED) {
        toggleStepStatus(currentStep + 1, isValid);
      }
    }
    // we also need to complete the current step if it's valid
    if (isValid) {
      completeStep(currentStep);
    } else {
      uncompleteStep(currentStep, mode);
    }
  }, [isValid]);

  return (
    <FormStepper
      steps={stepStates}
      currentStep={currentStep}
      onStepClick={handleStepClick}
    />
  );
}
