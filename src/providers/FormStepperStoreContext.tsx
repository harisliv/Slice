import { type StoreApi } from 'zustand';
import type { FormStepperStore } from '@app/types';
import { createContext } from 'react';

const FormStepperStoreContext =
  createContext<StoreApi<FormStepperStore> | null>(null);

export default FormStepperStoreContext;
