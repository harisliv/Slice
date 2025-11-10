import type { JSX } from 'react';
import type { ModalType } from '../Modal/Modal.types';

export enum IModalAction {
  DRAFT = 'draft',
  EXIT = 'exit',
  SUBMIT = 'submit'
}

export interface FormModalProps {
  modalType?: ModalType;
  modalSubtitle?: string;
  isOpen: boolean;
  onClose: (shouldNavigate?: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
  isDraftSaved?: boolean;
  tempNVPSetup?: boolean;
  hasFormErrors?: boolean;
  content?: string;
  onOk?: () => void;
}

export interface ModalContent {
  title: JSX.Element;
  description: JSX.Element;
  secondDescription?: JSX.Element;
  confirmText: string;
  cancelText: string;
  shouldExitForm?: boolean;
}

export interface ModalContentMap {
  [key: string]: ModalContent;
}
