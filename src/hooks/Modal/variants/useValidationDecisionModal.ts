import { useModalStore } from "../useModalStore";

interface ValidationDecisionModalActions {
  onConfirm: () => void;
}

export const useValidationDecisionModal = ({
  onConfirm,
}: ValidationDecisionModalActions) => {
  const { showModal, hideModal } = useModalStore();

  const showValidationDecisionModal = () => {
    showModal({
      title: "Apply decisions",
      subtitle: "Review validation changes",
      content:
        "You are about to validate the relationship. You can revoke this decision by exiting the edit mode without  submitting changes. Once you submit changes, the relationship will not be confirmed.",
      buttons: [
        {
          text: "Return",
          action: () => {
            hideModal();
          },
        },
        {
          text: "Confirm",
          action: () => {
            hideModal();
            onConfirm();
          },
        },
      ],
    });
  };

  return { showValidationDecisionModal };
};
