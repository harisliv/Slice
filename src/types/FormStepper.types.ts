import type { IStepProps, StepStatus } from '@app/lib/types';

export interface FormStepperState {
  currentStep: number;
  completedSteps: Set<number>;
  steps: IStepProps[];
  onStepChange?: (currentStep: number) => void;
  initialStepStatus: StepStatus;
}

export interface FormStepperActions {
  goToStep: (index: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  completeStep: (index: number) => void;
  uncompleteStep: (index: number, mode: 'serial' | 'random') => void;
  resetSteps: () => void;
  getStepStates: () => IStepProps[];
  toggleStepStatus: (index: number, toggle: boolean) => void;
  getStepByIndex: (index: number) => IStepProps;
  updateStepStatusSerial: (statusArray: StepStatus[]) => void;
  saveCurrentStepStatus: (index: number) => void;
  revertToCurrentStepInitialStatus: (index: number) => void;
}

export type FormStepperStore = FormStepperState & {
  actions: FormStepperActions;
};
