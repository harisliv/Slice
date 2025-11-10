import { useModalStore } from '../useModalStore';

interface ExitModalActions {
  onConfirm: () => void;
}

export const useExitModal = ({ onConfirm }: ExitModalActions) => {
  const { showModal, hideModal } = useModalStore();

  const showExitModal = () => {
    showModal({
      title: 'Attention',
      subtitle: 'Are you sure you want to exit the form?',
      content:
        'You have unsaved changes. Are you sure you want to exit from creating report?',
      buttons: [
        {
          text: 'Cancel',
          action: () => {
            hideModal();
          }
        },
        {
          text: 'Confirm',
          action: () => {
            hideModal();
            onConfirm();
          }
        }
      ]
    });
  };

  return { showExitModal };
};
