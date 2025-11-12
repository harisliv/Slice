import {
  logger,
  stringSchemaMandatoryType,
  stringSchemaOptionalType
} from '@app/utils';
import { constructErrorResponseFromZod } from '@app/utils/error';
import { z } from 'zod';

export const goalsShape = z.object({
  climateRelatedGoalImpactStatement: stringSchemaMandatoryType({
    maxChars: 300
  }),
  climateRelatedGoalDescription: stringSchemaMandatoryType({
    maxChars: 3000
  }),
  climateRelatedGoalAlignmentParis: stringSchemaMandatoryType({
    maxChars: 3000
  }),
  climateRelatedGoalAlignmentMultilateral: z.array(
    z.object({
      id: z.string().optional(),
      agreement: stringSchemaOptionalType(),
      description: stringSchemaOptionalType()
    })
  ),
  climateRelatedGoalAlignmentOtherDescription: stringSchemaMandatoryType({
    maxChars: 3000
  }),
  additionalValueInitiative: stringSchemaOptionalType({
    maxChars: 5000
  }),
  tempClimateRelatedGoalAlignmentMultilateralAgreements: z.string().optional(),
  tempClimateRelatedGoalAlignmentMultilateralDescription: z
    .string()
    .max(3000)
    .optional()
});

export type GoalsFormData = z.infer<typeof goalsShape>;

// export const goalsShapeProps = z.object({
//   ...goalsShape._def.shape
// });

export const isGoalsShape = (
  value: unknown,
  withLogs: boolean = true
): value is GoalsFormData => {
  const result = goalsShape.safeParse(value);
  if (result.error && withLogs) {
    logger.error(
      'Invalid response format',
      new Error('Goals'),
      constructErrorResponseFromZod(result)
    );
  }
  return result.success;
};

export const isGoalsSchema = (
  value: unknown,
  withLogs: boolean = true
): value is GoalsFormData => {
  const result = goalsShape.safeParse(value);
  if (result.error && withLogs) {
    logger.error(
      'Invalid response format',
      new Error('Goals'),
      constructErrorResponseFromZod(result)
    );
  }
  return result.success;
};

export const defaultGoalsFormValues: GoalsFormData = {
  climateRelatedGoalImpactStatement: '',
  climateRelatedGoalDescription: '',
  climateRelatedGoalAlignmentParis: '',
  climateRelatedGoalAlignmentMultilateral: [],
  climateRelatedGoalAlignmentOtherDescription: '',
  additionalValueInitiative: '',
  tempClimateRelatedGoalAlignmentMultilateralAgreements: '',
  tempClimateRelatedGoalAlignmentMultilateralDescription: ''
};

export type Agreement = {
  value: string;
  label: string;
  saved: boolean;
};
