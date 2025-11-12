import type { FC } from 'react';
import type { FormModalProps } from './FormModal.types';
import Modal from '../Modal';
import { ModalType } from '../Modal/Modal.types';
import ButtonComponent from '../Button';
import { AlertTriangleIcon } from '@app/lib/icons';
import { Theme } from '@app/lib/general';
import { Paragraph } from '../Global';

const FormModal: FC<FormModalProps> = ({
  modalSubtitle = 'Are you sure you want to exit the form?',
  content,
  modalType = ModalType.NORMAL,
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  onOk
}) => (
  <Modal
    headerIcon={
      <AlertTriangleIcon fill={Theme.palette.secondary.warningOrange} />
    }
    modalTitle={'Attention'}
    onClose={() => onClose(false)}
    open={isOpen}
    modalType={modalType}
    footerChildren={
      <>
        {onOk ? (
          <ButtonComponent onClick={onOk} customVariant="primary-m">
            OK
          </ButtonComponent>
        ) : (
          <>
            <ButtonComponent
              onClick={() => onClose(false)}
              customVariant="secondary-m"
            >
              Cancel
            </ButtonComponent>
            <ButtonComponent
              onClick={onConfirm}
              customVariant="primary-m"
              loading={isLoading}
            >
              Confirm
            </ButtonComponent>
          </>
        )}
      </>
    }
  >
    <Paragraph variant="medium-bold">{modalSubtitle}</Paragraph>
    <Paragraph>{content}</Paragraph>
  </Modal>
);

export default FormModal;
