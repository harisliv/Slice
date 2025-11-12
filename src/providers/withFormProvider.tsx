import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldErrors
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type z } from 'zod';
import { type ReactNode } from 'react';
import { useMemo } from 'react';
import { FormActionBar } from '@app/lib/ui';
import type { IFormActionBar } from '@app/lib/types';
import { logger } from '@app/utils';
import {
  useMultiStepFormActions,
  useMultiStepFormValues,
  usePreviousModal,
  useExitModal,
  useSubmissionPeriodCheck
} from '@app/hooks';
import { useNavigate } from 'react-router';
import {
  useCurrentStep,
  useFormStepperActions
} from '@app/hooks/useFormStepper';
import { constructErrorFromRHF } from '@app/utils/error';
import { isEmpty } from 'lodash';
import ModalProvider from './ModalProvider';

interface FormProviderProps extends IFormActionBar {
  children: ReactNode;
}

export default function withFormProvider<T extends z.ZodTypeAny>(
  schema: T,
  defaultValues: DefaultValues<z.infer<T>>,
  exitRoute: string,
  typeGuard: (data: unknown) => boolean
) {
  return function FormProviderComponent({
    children,
    exit,
    previous,
    submit,
    next,
    draft
  }: FormProviderProps) {
    const methods = useForm<z.infer<T>>({
      defaultValues,
      resolver: zodResolver(schema),
      mode: 'onChange'
    });

    const { updateFormValues } = useMultiStepFormActions();
    const navigate = useNavigate();

    const currentStep = useCurrentStep();
    const { goToNextStep, goToPreviousStep, revertToCurrentStepInitialStatus } =
      useFormStepperActions();

    const goToPreviousStepAndRevertToInitialState = () => {
      revertToCurrentStepInitialStatus(currentStep);
      goToPreviousStep();
    };

    const { showPreviousModal } = usePreviousModal({
      onConfirm: goToPreviousStepAndRevertToInitialState
    });

    const { showExitModal } = useExitModal({
      onConfirm: () => navigate(`${exitRoute}`)
    });

    const {
      watch,
      handleSubmit,
      formState: { isValid, errors, isDirty, dirtyFields }
    } = methods;

    // useEffect(() => {
    //     logger.info('Triggering form Validation');
    //     trigger();
    // }, [trigger]);

    const contextValues = useMultiStepFormValues<T>();

    const formValues = watch();

    const { canSubmit, showSubmissionModal } =
      useSubmissionPeriodCheck(formValues);

    const valuesToValidate = useMemo(
      () => ({ ...contextValues, ...formValues }),
      [contextValues, formValues]
    );

    const isFormReadyToSubmit = useMemo(
      () => typeGuard(valuesToValidate),
      [valuesToValidate, typeGuard]
    );

    logger.info('############### Step', currentStep + 1, '###############');
    logger.info('Form Values', formValues);
    logger.info('Context values', contextValues);
    if (Object.values(errors).length > 0) {
      logger.error(
        'Step error',
        new Error(exitRoute),
        constructErrorFromRHF(errors)
      );
    }
    logger.info('###################################');

    const updateBeforeUnmount = () => {
      if (isValid) {
        updateFormValues(formValues);
      }
    };

    const customPrevious = () => {
      previous.action?.();
      if (isDirty && !isEmpty(dirtyFields)) {
        showPreviousModal();
      } else {
        goToPreviousStep();
      }
    };

    const customNext = () => {
      next.action?.();
      updateBeforeUnmount();
      goToNextStep();
    };

    const customSubmitAction = () => {
      if (canSubmit) {
        handleSubmit((data) => {
          submit.action?.({ ...contextValues, ...data });
        }, onError)();
      } else {
        showSubmissionModal();
      }
    };

    const customDraftAction = () => {
      handleSubmit((data) => {
        draft?.action?.({ ...contextValues, ...data });
      }, onError)();
    };

    const customExit = () => {
      exit.action?.();
      if (isDirty && !isEmpty(dirtyFields)) {
        showExitModal();
      } else {
        navigate(`${exitRoute}`);
      }
    };

    const onError = (errors: FieldErrors<z.infer<T>>) => {
      logger.error(
        'Submit form errors',
        new Error('Submit form errors'),
        errors
      );
    };

    const formActionBarProps: IFormActionBar = {
      next: {
        enabled: isValid,
        action: customNext,
        display: next.display
      },
      previous: {
        enabled: currentStep > 0,
        action: customPrevious,
        display: previous.display
      },
      submit: {
        title: submit.title,
        enabled: isFormReadyToSubmit,
        display: submit.display,
        action: customSubmitAction
      },
      draft: {
        display: draft?.display ?? false,
        enabled: draft?.enabled ?? isValid,
        action: customDraftAction
      },
      exit: {
        title: exit.title,
        enabled: true,
        display: true,
        action: customExit
      }
    };

    return (
      <FormProvider {...methods}>
        <ModalProvider>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            noValidate
          >
            {children}
            <FormActionBar {...formActionBarProps} />
          </form>
        </ModalProvider>
      </FormProvider>
    );
  };
}
