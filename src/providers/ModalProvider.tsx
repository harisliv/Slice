import { type ReactNode } from 'react';
import { Modal, ButtonComponent, Paragraph } from '@app/lib/ui';
import { useModalStore } from '@app/hooks';
import { AlertTriangleIcon } from '@app/lib/icons';
import { Theme } from '@app/lib/general';

interface ModalProviderProps {
  children: ReactNode;
}

export default function ModalProvider({ children }: ModalProviderProps) {
  const { show, title, subtitle, content, buttons, hideModal } =
    useModalStore();

  return (
    <>
      {children}

      <Modal
        open={show}
        headerIcon={
          <AlertTriangleIcon fill={Theme.palette.secondary.warningOrange} />
        }
        modalTitle={title}
        onClose={hideModal}
        footerChildren={
          buttons.length > 0 ? (
            <>
              {buttons.map((button, index) => (
                <ButtonComponent
                  key={`modal-button-${button.text}-${index}`}
                  onClick={() => button.action(null)}
                  customVariant={button.customVariant}
                >
                  {button.text}
                </ButtonComponent>
              ))}
            </>
          ) : null
        }
      >
        {subtitle && <Paragraph variant="medium-bold">{subtitle}</Paragraph>}
        {content && <Paragraph>{content}</Paragraph>}
      </Modal>
    </>
  );
}
