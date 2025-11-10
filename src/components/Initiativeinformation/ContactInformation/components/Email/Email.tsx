import { INITIATIVE_INFORMATION_FIELD_INFO } from '@app/constants';
import { InitiativeProfileControlledInput } from '@app/components';

export default function Email() {
  return (
    <InitiativeProfileControlledInput
      name={'contactEmail'}
      required
      customGridSize="half"
      inputDescriptionTitle={
        INITIATIVE_INFORMATION_FIELD_INFO.contactEmail.title
      }
      inputDescriptionSubtitle={
        INITIATIVE_INFORMATION_FIELD_INFO.contactEmail.subtitle
      }
    />
  );
}
