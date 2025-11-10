export interface MultiStepFormState<T> {
  formValues: Partial<T>;
}

export interface MultiStepFormActions<T> {
  setFormValues: (values: Partial<T>) => void;
  updateFormValues: (values: Partial<T>) => void;
  resetFormValue: (name: keyof T) => void;
  resetFormValues: () => void;
  getFormValues: () => Partial<T>;
}

export type MultiStepFormStore<T> = MultiStepFormState<T> & {
  actions: MultiStepFormActions<T>;
};
