import { useModalStore } from "../useModalStore";

type DeleteArgs = {
  subtitle?: string;
  content?: string;
  onConfirm?: () => void;
};

export const useDeleteModal = () => {
  const { showModal, hideModal } = useModalStore();

  const showDeleteModal = ({
    subtitle = "Are you sure you want to remove",
    content = "",
    onConfirm,
  }: DeleteArgs) => {
    showModal({
      title: "Attention",
      subtitle: subtitle,
      content: content,
      buttons: [
        {
          text: "Cancel",
          action: () => {
            hideModal();
          },
          customVariant: "secondary-m",
        },
        {
          text: "Delete",
          action: () => {
            hideModal();
            onConfirm?.();
          },
          customVariant: "primary-m",
        },
      ],
    });
  };

  return { showDeleteModal };
};
