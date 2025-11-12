import { OrganizationalStructureControlledInput } from '@app/components/ControlledInput';
import { ORGANIZATIONAL_STRUCTURE_FIELD_INFO } from '@app/constants';

export default function SignatoryRemoval() {
  return (
    <OrganizationalStructureControlledInput
      name="signatoryRemoval"
      inputDescriptionTitle={
        ORGANIZATIONAL_STRUCTURE_FIELD_INFO.signatoryRemoval.title
      }
      inputDescriptionSubtitle={
        ORGANIZATIONAL_STRUCTURE_FIELD_INFO.signatoryRemoval.subtitle
      }
      helperText={ORGANIZATIONAL_STRUCTURE_FIELD_INFO.signatoryRemoval.helper}
      istextArea
    />
  );
}
