import { useContext } from "react";
import { useStore } from "zustand";
import FormStepperStoreContext from "@app/providers/FormStepperStoreContext";
import type { FormStepperStore } from "@app/types";

export const useFormStepper = <T,>(
  selector: (state: FormStepperStore) => T,
) => {
  const store = useContext(FormStepperStoreContext);
  if (!store) {
    throw new Error("Missing FormStepperProvider");
  }
  return useStore(store, selector);
};

export const useFormStepperActions = () =>
  useFormStepper((state) => state.actions);
export const useCurrentStep = () =>
  useFormStepper((state) => state.currentStep);
export const useStepStates = () => useFormStepper((state) => state.steps);
