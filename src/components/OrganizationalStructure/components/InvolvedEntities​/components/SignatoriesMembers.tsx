import { OrganizationalStructureControlledMultiSelect } from "@app/components/ControlledInput";
import { useFormContext } from "react-hook-form";
import { type InvolvedEntitiesFormData } from "@app/types";
import { ORGANIZATIONAL_STRUCTURE_FIELD_INFO } from "@app/constants";

export default function SignatoryCriteria() {
  const { setValue } = useFormContext<InvolvedEntitiesFormData>();
  return (
    <OrganizationalStructureControlledMultiSelect
      name="signatoriesMembers"
      customGridSize="half"
      required
      inputDescriptionTitle={
        ORGANIZATIONAL_STRUCTURE_FIELD_INFO.signatoriesMembers.title
      }
      inputDescriptionSubtitle={
        ORGANIZATIONAL_STRUCTURE_FIELD_INFO.signatoriesMembers.subtitle
      }
      dropdownEnpoint="SignatoriesAndMembers"
      onApplyCapture={(value) => {
        if (!value.includes("Signatories")) {
          setValue("signatoryCriteria", "");
          setValue("signatoryFollowUps", []);
          setValue("signatoryFollowUpsOther", "");
          setValue("signatoryRemoval", "");
        }

        if (!value.includes("Members")) {
          setValue("memberInformation", "");
        }

        // if (value.includes('We do not have participants')) {
        //   setValue('signatoriesMembers', ['We do not have participants']);
        // }
      }}
    />
  );
}
