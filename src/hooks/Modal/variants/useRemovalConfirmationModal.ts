import { useModalStore } from "../useModalStore";

interface RemovalConfirmationModalActions {
  onConfirm: (id: string) => void;
}

export const useRemovalConfirmationModal = ({
  onConfirm,
}: RemovalConfirmationModalActions) => {
  const { showModal, hideModal } = useModalStore();

  const showRemovalConfirmationModal = (id: string, initiativeName: string) => {
    showModal({
      title: "Attention",
      subtitle: "Are you sure you want to remove this initiative?",
      content: initiativeName
        ? `You are about to remove the relationship with "${initiativeName}" You can revoke this decision by exiting the edit mode without  submitting changes. Once you submit changes, the relationship with "${initiativeName}" will be removed.`
        : "This initiative will be marked for removal.",
      buttons: [
        {
          text: "Cancel",
          action: () => {
            hideModal();
          },
        },
        {
          text: "Continue",
          action: () => {
            hideModal();
            onConfirm(id);
          },
        },
      ],
    });
  };

  return { showRemovalConfirmationModal };
};
