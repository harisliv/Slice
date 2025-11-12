import { OrganizationalStructureControlledInput } from '@app/components/ControlledInput';
import { ORGANIZATIONAL_STRUCTURE_FIELD_INFO } from '@app/constants';

export default function OrganizationalArrangement() {
  return (
    <OrganizationalStructureControlledInput
      name="organizationalArrangements"
      inputDescriptionTitle={
        ORGANIZATIONAL_STRUCTURE_FIELD_INFO.organizationalArrangements.title
      }
      inputDescriptionSubtitle={
        ORGANIZATIONAL_STRUCTURE_FIELD_INFO.organizationalArrangements.subtitle
      }
      helperText={
        ORGANIZATIONAL_STRUCTURE_FIELD_INFO.organizationalArrangements.helper
      }
      required
      istextArea
    />
  );
}
