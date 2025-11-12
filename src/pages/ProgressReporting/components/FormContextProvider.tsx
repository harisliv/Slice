import { withFormProvider } from "@app/providers";
import type { ReactNode } from "react";
import type { IFormActionBar } from "@app/lib/types";
import { useMemo } from "react";
import { useCurrentStep } from "@app/hooks/useFormStepper";
import useGetSchema from "../hooks/useGetSchema";
import { isProgressReportingSchema } from "@app/types";
import { useMutateProgressReporting, useSubmitModal } from "@app/hooks";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

interface CreateReportProfileContextProviderProps {
  children: ReactNode;
  reportId: string;
}

const FormContextProvider = ({
  children,
  reportId,
}: CreateReportProfileContextProviderProps) => {
  const currentStep = useCurrentStep();
  const navigate = useNavigate();

  const { mutateAsync: mutateProgressReporting } =
    useMutateProgressReporting(reportId);
  const queryClient = useQueryClient();

  const { showSubmitModal } = useSubmitModal({
    onConfirm: async (data) => {
      if (data) {
        navigate(`/assignment-management`);
        await mutateProgressReporting({ ...data, reportStatus: "Submitted" });
        queryClient.invalidateQueries({
          queryKey: ["submittedReports"],
        });
      }
    },
  });

  const formActionBarProps: IFormActionBar = {
    submit: {
      action: async (data) => {
        showSubmitModal(data);
      },
      title: "Submit assignment",
      display: currentStep === 4,
      enabled: true,
    },
    next: {
      display: currentStep < 4,
    },
    previous: {
      display: true,
    },
    exit: {
      display: true,
      title: "Exit",
    },
    draft: {
      display: true,
      title: "Save as a draft",
      action: mutateProgressReporting,
    },
  };

  const { schema, defaultValues } = useGetSchema(currentStep, reportId);

  const DynamicFormProvider = useMemo(
    () =>
      withFormProvider(
        schema,
        defaultValues,
        "/assignment-management",
        isProgressReportingSchema,
      ),
    [schema, defaultValues],
  );

  return (
    <DynamicFormProvider {...formActionBarProps}>
      {children}
    </DynamicFormProvider>
  );
};

export default FormContextProvider;
