import type { DialogProps } from '@mui/material';
import type { ReactNode } from 'react';

export interface IModal extends DialogProps {
  modalTitle?: ReactNode | string;
  description?: ReactNode | string;
  children?: ReactNode | string;
  footerChildren?: ReactNode | string;
  modalType?: ModalType;
  onClose: () => void;
  $width?: string;
  headerIcon?: ReactNode | string;
  justifyFooterChildren?: string;
  loading?: boolean;
  $minHeight?: string;
}

export enum ModalType {
  NORMAL = 'normal',
  DOCUMENTS = 'documents',
  COMMENTS = 'comments'
}
