import { OrganizationalStructureControlledInput } from '@app/components/ControlledInput';
import { ORGANIZATIONAL_STRUCTURE_FIELD_INFO } from '@app/constants';

export default function SignatoryCriteria() {
  return (
    <OrganizationalStructureControlledInput
      name="signatoryCriteria"
      inputDescriptionTitle={
        ORGANIZATIONAL_STRUCTURE_FIELD_INFO.signatoryCriteria.title
      }
      inputDescriptionSubtitle={
        ORGANIZATIONAL_STRUCTURE_FIELD_INFO.signatoryCriteria.subtitle
      }
      helperText={ORGANIZATIONAL_STRUCTURE_FIELD_INFO.signatoryCriteria.helper}
      required
      istextArea
    />
  );
}
