import { GOALS_FIELD_INFO } from "@app/constants";
import { GoalsTargetsAndMonitoringControlledInput } from "@app/components";

export default function ImpactStatement() {
  return (
    <GoalsTargetsAndMonitoringControlledInput
      istextArea
      name={"climateRelatedGoalImpactStatement"}
      required
      customGridSize="full"
      helperText="Maximum 300 characters"
      inputDescriptionTitle={
        GOALS_FIELD_INFO.climateRelatedGoalImpactStatement.title
      }
      inputDescriptionSubtitle={
        GOALS_FIELD_INFO.climateRelatedGoalImpactStatement.subtitle
      }
    />
  );
}
