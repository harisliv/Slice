import React from "react";
import { createStore } from "zustand";
import type { MultiStepFormStore } from "@app/types";
import MultiStepFormStoreContext from "./MultiStepFormStoreContext";

export default function MultiStepFormProvider<T = Record<string, unknown>>({
  children,
  initialValues = {},
}: {
  children: React.ReactNode;
  initialValues?: Partial<T>;
}) {
  const [store] = React.useState(() =>
    createStore<MultiStepFormStore<T>>((set, get) => ({
      formValues: initialValues,

      actions: {
        setFormValues: (values: Partial<T>) => {
          set({ formValues: values });
        },

        updateFormValues: (values: Partial<T>) => {
          set((state) => ({
            formValues: { ...state.formValues, ...values },
          }));
        },

        resetFormValue: (name: keyof T) => {
          set((state) => ({
            formValues: { ...state.formValues, [name]: initialValues[name] },
          }));
        },

        resetFormValues: () => {
          set({ formValues: initialValues });
        },

        getFormValues: () => get().formValues,
      },
    })),
  );

  return (
    <MultiStepFormStoreContext.Provider value={store}>
      {children}
    </MultiStepFormStoreContext.Provider>
  );
}
