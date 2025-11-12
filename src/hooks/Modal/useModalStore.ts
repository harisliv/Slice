import type { TCustomButtonVariant } from '@app/lib/types';
import type { ReactNode } from 'react';
import { create } from 'zustand';

type ModalButtons = {
  text: string;
  action: (payload: unknown) => void;
  customVariant?: TCustomButtonVariant;
};

type ModalConfig = {
  show: boolean;
  title: string;
  subtitle: string;
  content: ReactNode;
  buttons: ModalButtons[];
};

type ModalStore = ModalConfig & {
  showModal: (config: Partial<ModalConfig>) => void;
  hideModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  show: false,
  title: '',
  subtitle: '',
  content: '',
  buttons: [],

  showModal: (config) => {
    set((state) => ({
      ...state,
      ...config,
      show: true
    }));
  },

  hideModal: () => {
    set((state) => ({
      ...state,
      show: false
    }));
  }
}));
