import { OrganizationalStructureControlledMultiSelect } from '@app/components/ControlledInput';
import { ORGANIZATIONAL_STRUCTURE_FIELD_INFO } from '@app/constants';

export default function SignatoryFollowUps() {
  return (
    <OrganizationalStructureControlledMultiSelect
      name="signatoryFollowUps"
      customGridSize="half"
      required
      inputDescriptionTitle={
        ORGANIZATIONAL_STRUCTURE_FIELD_INFO.signatoryFollowUps.title
      }
      inputDescriptionSubtitle={
        ORGANIZATIONAL_STRUCTURE_FIELD_INFO.signatoryFollowUps.subtitle
      }
      dropdownEnpoint="SignatoryFollowUps"
    />
  );
}
