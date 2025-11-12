import { type StoreApi } from "zustand";
import type { MultiStepFormStore } from "@app/types";
import { createContext } from "react";

const MultiStepFormStoreContext = createContext<StoreApi<
  MultiStepFormStore<any>
> | null>(null);

export default MultiStepFormStoreContext;
