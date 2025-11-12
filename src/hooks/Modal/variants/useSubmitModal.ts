import { useModalStore } from "../useModalStore";

interface SubmitModalActions {
  onConfirm: (data: any) => void;
}

export const useSubmitModal = ({ onConfirm }: SubmitModalActions) => {
  const { showModal, hideModal } = useModalStore();

  const showSubmitModal = (data: any) => {
    showModal({
      title: "Attention",
      subtitle: "Submitting report",
      content:
        "Your are about to submit a report. Once you submit this report, you will not be able to edit or delete it. This action cannot be undone.",
      buttons: [
        {
          text: "Return",
          action: () => {
            hideModal();
          },
        },
        {
          text: "Continue",
          action: () => {
            hideModal();
            onConfirm(data);
          },
        },
      ],
    });
  };

  return { showSubmitModal };
};
