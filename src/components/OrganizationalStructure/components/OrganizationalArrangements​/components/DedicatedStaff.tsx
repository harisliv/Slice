import { OrganizationalStructureControlledSelect } from '@app/components/ControlledInput';
import { ORGANIZATIONAL_STRUCTURE_FIELD_INFO } from '@app/constants';

export default function DedicatedStaff() {
  return (
    <OrganizationalStructureControlledSelect
      dropdownEnpoint="StaffingTypes"
      name="dedicatedStaff"
      inputDescriptionTitle={
        ORGANIZATIONAL_STRUCTURE_FIELD_INFO.dedicatedStaff.title
      }
      inputDescriptionSubtitle={
        ORGANIZATIONAL_STRUCTURE_FIELD_INFO.dedicatedStaff.subtitle
      }
      required
      customGridSize="half"
    />
  );
}
