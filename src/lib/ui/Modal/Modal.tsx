import type { FC } from 'react';
import { ExitIcon } from '@app/lib/icons';
import {
  CloseButton,
  DialogBody,
  DialogFooter,
  DialogHeaderContainer,
  StyledDialog,
  StyledDividingLine,
  StyledHeaderTitle,
  StyledTitle
} from './Modal.styles';
import type { IModal } from './Modal.types';
import { ModalType } from './Modal.types';
import { Box } from '@mui/material';
import SkeletonComponent from '../Skeleton';

const Modal: FC<IModal> = ({
  headerIcon,
  modalTitle,
  children,
  description,
  footerChildren,
  modalType = ModalType.DOCUMENTS,
  justifyFooterChildren,
  onClose,
  $width,
  loading = false,
  $minHeight,
  ...props
}) => (
  <StyledDialog
    aria-modal={true}
    {...props}
    disablePortal
    keepMounted={props.keepMounted ?? true}
    className="modal-wrapper"
    data-testid="modal.wrapper"
    onClose={(_, r) => {
      if (r === 'backdropClick') return;
      onClose();
    }}
    $modalType={modalType}
    $width={$width}
  >
    <DialogHeaderContainer>
      {modalTitle && (
        <StyledTitle>
          {headerIcon && <Box>{headerIcon}</Box>}
          {modalTitle && <StyledHeaderTitle>{modalTitle}</StyledHeaderTitle>}
        </StyledTitle>
      )}
      {onClose && (
        <CloseButton
          onClick={onClose}
          aria-label="close"
          aria-controls="buttons"
          data-testid="close-modal-testid"
        >
          <ExitIcon />
        </CloseButton>
      )}
    </DialogHeaderContainer>
    <StyledDividingLine />
    {loading ? (
      <Box sx={{ minHeight: $minHeight ?? 'auto', position: 'relative' }}>
        <SkeletonComponent />
      </Box>
    ) : (
      <>
        <DialogBody data-testid="modal.dialog-body" className="modal-body">
          {description}
          {children}
        </DialogBody>
        {footerChildren && (
          <DialogFooter justify={justifyFooterChildren}>
            {footerChildren}
          </DialogFooter>
        )}
      </>
    )}
  </StyledDialog>
);

export default Modal;
