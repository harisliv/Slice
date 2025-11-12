import React from "react";
import { createStore } from "zustand";
import type { IStepProps } from "@app/lib/types";
import { StepStatus } from "@app/lib/types";
import type { FormStepperStore } from "@app/types";
import FormStepperStoreContext from "./FormStepperStoreContext";

export default function FormStepperProvider({
  children,
  steps,
  onStepChange,
  initialStep,
}: {
  children: React.ReactNode;
  steps: IStepProps[];
  onStepChange?: (currentStep: number) => void;
  initialStep?: number;
}) {
  const [store] = React.useState(() => {
    return createStore<FormStepperStore>((set, get) => ({
      currentStep: initialStep || 0,
      completedSteps: new Set(),
      steps,
      onStepChange,
      initialStepStatus:
        steps[initialStep || 0]?.status || StepStatus.COMPLETED,

      actions: {
        goToStep: (index: number) => {
          const state = get();
          const stepStates = state.actions.getStepStates();
          const targetStep = stepStates[index];

          if (
            targetStep &&
            (targetStep.status === StepStatus.ACTIVE ||
              targetStep.status === StepStatus.COMPLETED)
          ) {
            set({ currentStep: index });
            state.onStepChange?.(index);
            state.actions.saveCurrentStepStatus(index);
          }
        },

        goToNextStep: () => {
          const state = get();
          state.actions.goToStep(state.currentStep + 1);
        },

        goToPreviousStep: () => {
          const state = get();
          state.actions.goToStep(state.currentStep - 1);
        },

        toggleStepStatus: (index: number, toggle: boolean) => {
          set((state) => ({
            steps: state.steps.map((step, idx) => ({
              ...step,
              status:
                idx === index
                  ? toggle
                    ? StepStatus.ACTIVE
                    : StepStatus.INACTIVE
                  : step.status,
            })),
          }));
        },

        completeStep: (index: number) => {
          set((state) => ({
            steps: state.steps.map((step, idx) => ({
              ...step,
              status: idx === index ? StepStatus.COMPLETED : step.status,
            })),
          }));
        },

        uncompleteStep: (index: number, mode: "serial" | "random") => {
          const uncompleteStatus =
            mode === "serial" ? StepStatus.INACTIVE : StepStatus.ACTIVE;
          set((state) => ({
            steps: state.steps.map((step, idx) => ({
              ...step,
              status: idx === index ? uncompleteStatus : step.status,
            })),
          }));
        },

        updateStepStatusSerial: (statusArray: StepStatus[]) => {
          set((state) => ({
            steps: state.steps.map((step, idx) => ({
              ...step,
              status: statusArray[idx],
            })),
          }));
        },

        resetSteps: () => {
          set({
            currentStep: 0,
            completedSteps: new Set(),
          });
        },

        getStepStates: () => {
          const { steps, currentStep, completedSteps } = get();

          return steps.map((step, idx) => {
            if (completedSteps.has(idx))
              return { ...step, status: StepStatus.COMPLETED };
            if (idx === currentStep)
              return { ...step, status: StepStatus.ACTIVE };
            return { ...step };
          });
        },

        getStepByIndex: (index: number) => {
          const { steps } = get();
          return steps[index];
        },

        saveCurrentStepStatus: (index: number) => {
          const { steps } = get();
          const initialStepStatus = steps[index]?.status;
          if (initialStepStatus) {
            set({ initialStepStatus });
          }
        },

        revertToCurrentStepInitialStatus: (index: number) => {
          const { initialStepStatus } = get();
          set((state) => ({
            steps: state.steps.map((step, idx) => ({
              ...step,
              status: idx === index ? initialStepStatus : step.status,
            })),
          }));
        },
      },
    }));
  });

  return (
    <FormStepperStoreContext.Provider value={store}>
      {children}
    </FormStepperStoreContext.Provider>
  );
}
