import type {
  OrganizationalStructureFormData,
  TempModalPayload,
} from "@app/types";
import { useFormContext } from "react-hook-form";
import { useModalStore } from "../useModalStore";

interface AddInitiativeConfirmationModalActions {
  onConfirm: (selectedInitiativeRelationship: TempModalPayload) => void;
}

export const useAddInitiativeConfirmationModal = ({
  onConfirm,
}: AddInitiativeConfirmationModalActions) => {
  const { showModal, hideModal } = useModalStore();
  const { getValues } = useFormContext<OrganizationalStructureFormData>();

  const showAddInitiativeConfirmationModal = () => {
    const tempOption = getValues(`tempOption`);
    const tempRelationshipType = getValues(`tempRelationshipType`);

    const initiativeName = tempOption?.name;

    showModal({
      title: "Attention",
      subtitle: "Adding a new initiative",
      content: `You are about to create a relationship with "${initiativeName}". You can revoke this decision by exiting the edit mode without  submitting changes. Once you submit changes, a validation request will be sent to  "${initiativeName}".`,
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
            onConfirm({
              relationshipType: tempRelationshipType ?? "",
              id: tempOption?.id ?? "",
              name: tempOption?.name ?? "",
            });
          },
        },
      ],
    });
  };

  return { showAddInitiativeConfirmationModal };
};
