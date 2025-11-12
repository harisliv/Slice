import { useModalStore } from "../useModalStore";

type DeleteArgs = {
  onConfirm?: () => void;
};

export const useDeleteParticipantModal = () => {
  const { showModal, hideModal } = useModalStore();

  const showDeleteParticipantModal = ({ onConfirm }: DeleteArgs) => {
    showModal({
      title: "Remove participants",
      subtitle: "You are about to remove this participant.",
      content: (
        <span>
          The relationship between the entity and your CCI will be removed. The
          entity will remain in the system database.
          <br />
          <br />
          The participant focal point, if defined in the system database, will
          receive an automated Email regarding this action.
        </span>
      ),
      buttons: [
        {
          text: "Cancel",
          action: () => {
            hideModal();
          },
          customVariant: "secondary-m",
        },
        {
          text: "Remove",
          action: () => {
            hideModal();
            onConfirm?.();
          },
          customVariant: "primary-m",
        },
      ],
    });
  };

  return { showDeleteParticipantModal };
};
