import { FormStepperProvider, MultiStepFormProvider } from "@app/providers";
import { logger } from "@app/utils";
import type { IStepProps } from "@app/lib/types";
import { useLoaderData } from "react-router";

export default function StateAndFormStepperProvider({
  children,
  steps,
}: {
  children: React.ReactNode;
  steps: IStepProps[];
}) {
  const { initialStep } = useLoaderData() || { initialStep: 1 };

  return (
    <MultiStepFormProvider>
      <FormStepperProvider
        steps={steps}
        onStepChange={(step) => {
          logger.info("Step changed to:", step);
        }}
        initialStep={initialStep - 1}
      >
        {children}
      </FormStepperProvider>
    </MultiStepFormProvider>
  );
}
