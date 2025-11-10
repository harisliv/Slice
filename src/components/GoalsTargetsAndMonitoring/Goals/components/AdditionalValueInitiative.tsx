import { GOALS_FIELD_INFO } from '@app/constants';
import { GoalsTargetsAndMonitoringControlledInput } from '@app/components';

export default function AlignmentParis() {
  return (
    <GoalsTargetsAndMonitoringControlledInput
      istextArea
      name={'additionalValueInitiative'}
      customGridSize="full"
      inputDescriptionTitle={GOALS_FIELD_INFO.additionalValueInitiative.title}
      inputDescriptionSubtitle={
        GOALS_FIELD_INFO.additionalValueInitiative.subtitle
      }
    />
  );
}
