import { GOALS_FIELD_INFO } from '@app/constants';
import { GoalsTargetsAndMonitoringControlledInput } from '@app/components';

export default function AlignmentParis() {
  return (
    <GoalsTargetsAndMonitoringControlledInput
      istextArea
      name={'climateRelatedGoalAlignmentParis'}
      required
      customGridSize="full"
      helperText="Maximum 3,000 characters"
      inputDescriptionTitle={
        GOALS_FIELD_INFO.climateRelatedGoalAlignmentParis.title
      }
      inputDescriptionSubtitle={
        GOALS_FIELD_INFO.climateRelatedGoalAlignmentParis.subtitle
      }
    />
  );
}
