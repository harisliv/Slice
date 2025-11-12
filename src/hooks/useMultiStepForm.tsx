import { useContext } from "react";
import { useStore } from "zustand";
import MultiStepFormStoreContext from "@app/providers/MultiStepFormStoreContext";
import type { MultiStepFormStore } from "@app/types";

export const useMultiStepForm = <T, R>(
  selector: (state: MultiStepFormStore<T>) => R,
) => {
  const store = useContext(MultiStepFormStoreContext);
  if (!store) {
    throw new Error("Missing MultiStepFormProvider");
  }
  return useStore(store, selector);
};

export const useMultiStepFormActions = <T,>() =>
  useMultiStepForm<T, MultiStepFormStore<T>["actions"]>(
    (state) => state.actions,
  );

export const useMultiStepFormValues = <T,>() =>
  useMultiStepForm<T, Partial<T>>((state) => state.formValues);
