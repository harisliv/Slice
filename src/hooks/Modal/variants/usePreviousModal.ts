import { useModalStore } from '../useModalStore';

interface PreviousModalActions {
  onConfirm: () => void;
}

export const usePreviousModal = ({ onConfirm }: PreviousModalActions) => {
  const { showModal, hideModal } = useModalStore();

  const showPreviousModal = () => {
    showModal({
      title: 'Attention',
      subtitle: 'Are you sure you want to exit the form?',
      content:
        'You have unsaved changes. Save your changes before exiting the page to not lose them.',
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

  return { showPreviousModal };
};
