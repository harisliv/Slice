import { OrganizationalStructureControlledInput } from '@app/components/ControlledInput';
import { ORGANIZATIONAL_STRUCTURE_FIELD_INFO } from '@app/constants';

export default function MemberInformation() {
  return (
    <OrganizationalStructureControlledInput
      name="memberInformation"
      inputDescriptionTitle={
        ORGANIZATIONAL_STRUCTURE_FIELD_INFO.memberInformation.title
      }
      inputDescriptionSubtitle={
        ORGANIZATIONAL_STRUCTURE_FIELD_INFO.memberInformation.subtitle
      }
      helperText={ORGANIZATIONAL_STRUCTURE_FIELD_INFO.memberInformation.helper}
      istextArea
      required
    />
  );
}
