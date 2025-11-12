import { useModalStore } from "../useModalStore";

type CreateArgs = {
  subtitle?: string;
  content?: string;
  onConfirm?: () => void;
};

export const useCreateModal = () => {
  const { showModal, hideModal } = useModalStore();

  const showCreateModal = ({
    subtitle = "Are you sure you want to create",
    content = "",
    onConfirm,
  }: CreateArgs) => {
    showModal({
      title: "Attention",
      subtitle: subtitle,
      content: content,
      buttons: [
        {
          text: "Return",
          customVariant: "secondary-m",
          action: () => {
            hideModal();
          },
        },
        {
          text: "Continue",
          action: () => {
            hideModal();
            onConfirm?.();
          },
        },
      ],
    });
  };

  return { showCreateModal };
};
