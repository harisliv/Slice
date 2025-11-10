import { INITIATIVE_INFORMATION_FIELD_INFO } from '@app/constants';
import { InitiativeProfileControlledSelect } from '@app/components';

export default function LaunchEvent() {
  return (
    <InitiativeProfileControlledSelect
      inputDescriptionTitle={
        INITIATIVE_INFORMATION_FIELD_INFO.launchEvent.title
      }
      inputDescriptionSubtitle={
        INITIATIVE_INFORMATION_FIELD_INFO.launchEvent.subtitle
      }
      name="launchEvent"
      dropdownEnpoint="Sessions"
    />
  );
}
