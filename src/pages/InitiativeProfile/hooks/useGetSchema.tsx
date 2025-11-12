import {
  defaultGoalsTargetsAndMonitoringFormValues,
  defaultFunctionFocusAndThemesFormValues,
  defaultInitiativeInformationFormValues,
  defaultOrganizationalStructureFormValues,
  goalsTargetsAndMonitoringSchema,
  FunctionFocusAndThemesSchema,
  initiativeInformationSchema,
  organizationalStructureSchema,
  type InitiativeProfileFormData,
  initiativeProfileShape,
  defaultInitiativeProfileFormValues
} from '@app/types';
import { isEmpty, pick } from 'lodash';
import {
  useInitiativeProfile,
  useMultiStepFormActions,
  useMultiStepFormValues
} from '@app/hooks';
import { getStepStatusArray } from '@app/utils/InitiativeProfile';
import {
  useCurrentStep,
  useFormStepperActions
} from '@app/hooks/useFormStepper';
import { useEffect, useMemo } from 'react';

export default function useGetSchema(step: number) {
  const { updateFormValues } = useMultiStepFormActions();
  const { updateStepStatusSerial, saveCurrentStepStatus } =
    useFormStepperActions();
  const currentStep = useCurrentStep();
  const { data: initiativeProfile } = useInitiativeProfile();

  useEffect(() => {
    if (initiativeProfile) {
      updateFormValues(initiativeProfile);
      const stepStatusArray = getStepStatusArray(initiativeProfile);
      updateStepStatusSerial(stepStatusArray);
      saveCurrentStepStatus(currentStep);
    }
  }, [initiativeProfile, updateFormValues]);

  const savedFormData = useMultiStepFormValues<InitiativeProfileFormData>();

  const formData = useMemo(
    () => ({ ...initiativeProfile, ...savedFormData }),
    [initiativeProfile, savedFormData]
  );

  return useMemo(() => {
    switch (step) {
      case 0: {
        const pickedValues = pick(
          formData,
          Object.keys(defaultInitiativeInformationFormValues)
        );

        const defaultValues = !isEmpty(pickedValues)
          ? pickedValues
          : defaultInitiativeInformationFormValues;

        return {
          schema: initiativeInformationSchema,
          defaultValues
        };
      }
      case 1: {
        const pickedValues = pick(
          formData,
          Object.keys(defaultGoalsTargetsAndMonitoringFormValues)
        );

        const withEmptyTargets = {
          ...pickedValues,
          targets: []
        };

        const defaultValues = !isEmpty(withEmptyTargets)
          ? withEmptyTargets
          : defaultGoalsTargetsAndMonitoringFormValues;

        return {
          schema: goalsTargetsAndMonitoringSchema,
          defaultValues
        };
      }
      case 2: {
        const pickedValues = pick(
          formData,
          Object.keys(defaultOrganizationalStructureFormValues)
        );

        const defaultValues = !isEmpty(pickedValues)
          ? pickedValues
          : defaultOrganizationalStructureFormValues;

        return {
          schema: organizationalStructureSchema,
          defaultValues
        };
      }
      case 3: {
        const pickedValues = pick(
          formData,
          Object.keys(defaultFunctionFocusAndThemesFormValues)
        );

        const defaultValues = !isEmpty(pickedValues)
          ? pickedValues
          : defaultFunctionFocusAndThemesFormValues;

        return {
          schema: FunctionFocusAndThemesSchema,
          defaultValues
        };
      }
      default:
        return {
          schema: initiativeProfileShape,
          defaultValues: defaultInitiativeProfileFormValues
        };
    }
  }, [step, formData]);
}
