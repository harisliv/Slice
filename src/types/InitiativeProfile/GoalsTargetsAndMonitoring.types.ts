import { z } from "zod";
import {
  defaultGoalsFormValues,
  goalsShape,
  isGoalsSchema,
} from "./Goals.types";
import {
  defaultMonitoringFormValues,
  isMonitoringSchema,
  monitoringShape,
  monitoringSuperRefine,
} from "./Monitoring.types";
import {
  defaultTargetValues,
  isTargetsSchema,
  targetsSchema,
  targetsShape,
} from "./Target.types";

export const goalsTargetsAndMonitoringSchema = z
  .object({
    ...goalsShape.shape,
    ...targetsShape.shape,
    ...monitoringShape.shape,
    newTargets: targetsSchema.shape.targets,
  })
  .superRefine(monitoringSuperRefine);

export type GoalsTargetsAndMonitoringShape = z.infer<
  typeof goalsTargetsAndMonitoringSchema
>;

export const isGoalsTargetsAndMonitoringSchema = (
  value: unknown,
  withLogs: boolean = true,
): value is GoalsTargetsAndMonitoringShape => {
  const isGoals = isGoalsSchema(value, withLogs);
  const isTargets = isTargetsSchema(
    {
      targets: (value as GoalsTargetsAndMonitoringShape).newTargets,
    },
    withLogs,
  );
  const isMonitoring = isMonitoringSchema(value, withLogs);
  return isGoals && isTargets && isMonitoring;
};

export const defaultGoalsTargetsAndMonitoringFormValues: GoalsTargetsAndMonitoringShape =
  {
    ...defaultGoalsFormValues,
    ...defaultTargetValues,
    ...defaultMonitoringFormValues,
    newTargets: [],
  };
