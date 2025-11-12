import { useModalStore } from '../useModalStore';

interface StepChangeModalActions {
  onConfirm: (stepIndex: number) => void;
}

export const useStepChangeModal = ({ onConfirm }: StepChangeModalActions) => {
  const { showModal, hideModal } = useModalStore();

  const showStepChangeModal = (stepIndex: number) => {
    showModal({
      title: 'Attention',
      subtitle: 'Unsaved Changes',
      content:
        'You have unsaved changes. If you leave this page before you submit changes, your edits will be lost',
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
            onConfirm(stepIndex);
          }
        }
      ]
    });
  };

  return { showStepChangeModal };
};
