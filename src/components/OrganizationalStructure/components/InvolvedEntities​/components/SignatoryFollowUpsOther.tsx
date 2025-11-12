import { OrganizationalStructureControlledInput } from '@app/components/ControlledInput';
import { ORGANIZATIONAL_STRUCTURE_FIELD_INFO } from '@app/constants';

export default function SignatoryFollowUpsOther() {
  return (
    <OrganizationalStructureControlledInput
      name="signatoryFollowUpsOther"
      required
      inputDescriptionTitle={
        ORGANIZATIONAL_STRUCTURE_FIELD_INFO.signatoryFollowUpsOther.title
      }
      inputDescriptionSubtitle={
        ORGANIZATIONAL_STRUCTURE_FIELD_INFO.signatoryFollowUpsOther.subtitle
      }
      helperText={
        ORGANIZATIONAL_STRUCTURE_FIELD_INFO.signatoryFollowUpsOther.helper
      }
      istextArea
    />
  );
}
