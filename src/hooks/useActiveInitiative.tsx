import type { InitiativeInfo } from '@app/types';
import { create } from 'zustand';
import { queryClient } from '@app/config';

interface IActiveInitiativeStore {
  activeInitiative: InitiativeInfo | null;
  setActiveInitiative: (initiative?: InitiativeInfo) => void;
}

export const useActiveInitiative = create<IActiveInitiativeStore>((set) => ({
  activeInitiative: null,
  setActiveInitiative: (initiative?: InitiativeInfo) => {
    set({ activeInitiative: initiative });
    queryClient.invalidateQueries({ queryKey: ['dropdown', 'Initiatives'] });
  }
}));
