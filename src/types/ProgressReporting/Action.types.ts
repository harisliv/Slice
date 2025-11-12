import {
  isInvalidString,
  logger,
  stringSchemaMandatoryType,
  stringSchemaOptionalType
} from '@app/utils';
import { constructErrorResponseFromZod } from '@app/utils/error';
import { isEmpty } from 'lodash';
import { z } from 'zod';

const actionBaseShape = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(1, 'Action title is required')
    .max(100, 'Action title is too long'),
  description: z
    .string()
    .min(1, 'Action description is required')
    .max(5000, 'Action description is too long'),
  typeOfAction: z.string().min(1, 'Type of action is required'),
  typeOther: z
    .string()
    .max(100, 'Type of action other description is too long'),
  associatedTargets: z
    .array(z.string())
    .max(7, 'Maximum 7 associated targets')
    .optional(),
  outcomes: stringSchemaMandatoryType({ maxChars: 5000 }),
  outcomesUrl: z.array(z.string()),
  impactExplanation: z
    .string()
    .min(1, 'Impact explanation is required')
    .max(5000, 'Impact explanation is too long'),
  contributionToMultilateralProcess: z.array(z.string()),
  contributionOfTheAction: stringSchemaOptionalType({ maxChars: 3000 })
});

export const actionShape = z.object({
  actions: z.array(actionBaseShape)
});

export const actionSuperRefine = (
  data: z.infer<typeof actionBaseShape>,
  ctx: z.RefinementCtx
) => {
  if (
    !isEmpty(data.contributionToMultilateralProcess) &&
    isInvalidString(data.contributionOfTheAction)
  ) {
    ctx.addIssue({
      path: ['contributionOfTheAction'],
      message: 'Contribution of the action is required',
      code: z.ZodIssueCode.custom
    });
  }
  if (
    data.typeOfAction.includes('Other') &&
    (!data.typeOther || data.typeOther.trim() === '')
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please specify other types of actions',
      path: ['typeOther']
    });
  }
};

export const actionBaseSchema = actionBaseShape.superRefine(actionSuperRefine);

export const actionSchema = z.object({
  actions: z.array(actionBaseSchema)
});

export type ActionFormData = z.infer<typeof actionShape>;

export const defaultActionValues: ActionFormData = {
  actions: [
    {
      id: '',
      title: '',
      description: '',
      typeOfAction: '',
      typeOther: '',
      associatedTargets: [],
      outcomes: '',
      outcomesUrl: [''],
      impactExplanation: '',
      contributionToMultilateralProcess: [],
      contributionOfTheAction: null
    }
  ]
};

// const actionShapeProps = z.object({
//   ...actionShape._def.shape
// });

export const isActionShape = (
  value: unknown,
  withLogs: boolean = true
): value is ActionFormData => {
  const result = actionShape.safeParse(value);
  if (result.error && withLogs) {
    logger.error(
      'Invalid response format',
      new Error('Action'),
      constructErrorResponseFromZod(result)
    );
  }
  return result.success;
};

export const isActionSchema = (
  value: unknown,
  withLogs: boolean = true
): value is ActionFormData => {
  const result = actionSchema.safeParse(value);
  if (result.error && withLogs) {
    logger.error(
      'Invalid response format',
      new Error('Action'),
      constructErrorResponseFromZod(result)
    );
  }
  return result.success;
};
