import { InitiativeProfileControlledInput } from '@app/components';
import { INITIATIVE_INFORMATION_FIELD_INFO } from '@app/constants';

export default function InitiativeNameField() {
  return (
    <InitiativeProfileControlledInput
      name={'name'}
      inputDescriptionTitle={INITIATIVE_INFORMATION_FIELD_INFO.name.title}
      inputDescriptionSubtitle={INITIATIVE_INFORMATION_FIELD_INFO.name.subtitle}
      required
      customGridSize="half"
    />
  );
}
