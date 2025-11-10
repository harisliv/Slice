import {
  actionSchema,
  challengesAndOpportunitiesSchema,
  defaultActionValues,
  defaultChallengesAndOpportunitiesFormValues,
  defaultTimeframeOfInformationFormValues,
  defaultTProgressOfTargetsFormValues,
  progressOfTargetsSchema,
  progressReportingShape,
  timeframeOfInformationSchema,
  type TProgressReportingShape
} from '@app/types';
import { isEmpty, pick } from 'lodash';
import {
  useMultiStepFormActions,
  useMultiStepFormValues,
  useSelectedReport
} from '@app/hooks';
import {
  useCurrentStep,
  useFormStepperActions
} from '@app/hooks/useFormStepper';
import { useEffect, useMemo } from 'react';

export default function useGetSchema(step: number, reportId: string) {
  const { updateFormValues } = useMultiStepFormActions();
  const { updateStepStatusSerial, saveCurrentStepStatus } =
    useFormStepperActions();
  const currentStep = useCurrentStep();

  const { data: report } = useSelectedReport({ id: reportId ?? '' });

  useEffect(() => {
    if (report) {
      updateFormValues(report);
      saveCurrentStepStatus(currentStep);
    }
  }, [report, updateFormValues, updateStepStatusSerial]);

  const savedFormData = useMultiStepFormValues<TProgressReportingShape>();

  const formData = useMemo(
    () => ({ ...report, ...savedFormData }),
    [report, savedFormData]
  );

  return useMemo(() => {
    switch (step) {
      case 0: {
        const pickedValues = pick(
          formData,
          Object.keys(defaultTimeframeOfInformationFormValues)
        );

        const defaultValues = !isEmpty(pickedValues)
          ? pickedValues
          : defaultTimeframeOfInformationFormValues;

        return {
          schema: timeframeOfInformationSchema,
          defaultValues
        };
      }
      case 1: {
        const pickedValues = pick(formData, Object.keys(defaultActionValues));

        const defaultValues = !isEmpty(pickedValues)
          ? pickedValues
          : defaultActionValues;

        return { schema: actionSchema, defaultValues };
      }
      case 2: {
        const pickedValues = pick(
          formData,
          Object.keys(defaultTProgressOfTargetsFormValues)
        );

        const defaultValues = !isEmpty(pickedValues)
          ? pickedValues
          : defaultTProgressOfTargetsFormValues;

        return { schema: progressOfTargetsSchema, defaultValues };
      }
      case 3: {
        const pickedValues = pick(
          formData,
          Object.keys(defaultChallengesAndOpportunitiesFormValues)
        );

        const defaultValues = !isEmpty(pickedValues)
          ? pickedValues
          : defaultChallengesAndOpportunitiesFormValues;

        return { schema: challengesAndOpportunitiesSchema, defaultValues };
      }
      default:
        return {
          schema: progressReportingShape,
          defaultValues: formData
        };
    }
  }, [step, formData]);
}
