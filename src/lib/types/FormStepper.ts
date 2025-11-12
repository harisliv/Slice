export interface IStepProps {
  number: number;
  label: string;
  status: StepStatus;
}

export interface IStepperProps {
  steps: IStepProps[];
  currentStep: number;
  onStepClick: (index: number) => void;
}

export enum StepStatus {
  COMPLETED = 'completed',
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}
