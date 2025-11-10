import { GOALS_FIELD_INFO } from '@app/constants';
import { GoalsTargetsAndMonitoringControlledInput } from '@app/components';

export default function GoalDescription() {
  return (
    <GoalsTargetsAndMonitoringControlledInput
      istextArea
      name={'climateRelatedGoalDescription'}
      required
      customGridSize="full"
      helperText="Maximum 3,000 characters"
      inputDescriptionTitle={
        GOALS_FIELD_INFO.climateRelatedGoalDescription.title
      }
      inputDescriptionSubtitle={
        GOALS_FIELD_INFO.climateRelatedGoalDescription.subtitle
      }
    />
  );
}
