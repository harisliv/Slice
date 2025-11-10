import { withFormProvider } from '@app/providers';
import type { ReactNode } from 'react';
import type { IFormActionBar } from '@app/lib/types';
import { useCurrentStep } from '@app/hooks/useFormStepper';
import useGetSchema from '../hooks/useGetSchema';
import { isInitiativeProfileSchema } from '@app/types';

interface FormContextProviderProps extends IFormActionBar {
  children: ReactNode;
}

const FormContextProvider = ({
  children,
  ...props
}: FormContextProviderProps) => {
  const exitRoute = `/course-profile`;
  const currentStep = useCurrentStep();

  const { schema, defaultValues } = useGetSchema(currentStep);

  const DynamicFormProvider = withFormProvider(
    schema,
    defaultValues,
    exitRoute,
    isInitiativeProfileSchema
  );

  return <DynamicFormProvider {...props}>{children}</DynamicFormProvider>;
};

export default FormContextProvider;
