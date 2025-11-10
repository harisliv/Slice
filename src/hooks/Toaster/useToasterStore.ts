import { create } from 'zustand';

export enum ToasterType {
  SUCCESS = 'success',
  ERROR = 'error'
}

type ToasterConfig = {
  show: boolean;
  message: string;
  toasterType: ToasterType;
  errorDetails?: any;
};

type ToasterStore = ToasterConfig & {
  showToaster: (config: Omit<ToasterConfig, 'show'>) => void;
  hideToaster: () => void;
};

export const useToasterStore = create<ToasterStore>((set) => ({
  show: false,
  message: '',
  toasterType: ToasterType.SUCCESS,
  errorDetails: undefined,

  showToaster: (config) => {
    set({
      ...config,
      show: true
    });
  },

  hideToaster: () => {
    set((state) => ({
      ...state,
      show: false
    }));
  }
}));
