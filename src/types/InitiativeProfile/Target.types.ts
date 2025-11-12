import {
  logger,
  numberOptionalSchemaType,
  stringSchemaMandatoryType,
  stringSchemaOptionalType,
  yearOptionalSchemaType
} from '@app/utils';
import { constructErrorResponseFromZod } from '@app/utils/error';
import { isNaN } from 'lodash';
import { z } from 'zod';

export const targetBaseShape = z.object({
  id: z.string().nullable(),
  title: stringSchemaMandatoryType({
    maxChars: 100
  }),
  description: stringSchemaMandatoryType({
    maxChars: 5000
  }),
  targetProgress: z.array(
    z.object({
      id: z.string().nullable(),
      updateStatus: stringSchemaOptionalType(),
      descriptionStatus: stringSchemaOptionalType(),
      reportValue: numberOptionalSchemaType,
      latestReportedYear: yearOptionalSchemaType,
      createdOn: stringSchemaOptionalType()
    })
  ),
  year: yearOptionalSchemaType,
  baseyear: yearOptionalSchemaType,
  type: z
    .array(z.string())
    .min(1, 'Minimum 1 Target Type')
    .max(3, 'Maximum 3 Target Types'),
  typeDescription: stringSchemaOptionalType(),
  value: numberOptionalSchemaType,
  unit: stringSchemaOptionalType({
    maxChars: 5000
  }),
  status: stringSchemaOptionalType(),
  updateTarget: stringSchemaOptionalType(),
  statusReason: stringSchemaOptionalType()
});

export const targetBaseSchema = targetBaseShape.superRefine((data, ctx) => {
  if (
    typeof data.year === 'number' &&
    typeof data.baseyear === 'number' &&
    !isNaN(data.year) &&
    !isNaN(data.baseyear)
  ) {
    if (data.year <= data.baseyear) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Year must be greater than base year',
        path: ['year']
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Year must be greater than base year',
        path: ['baseyear']
      });
    }
  }
  if (data.type.includes('Other')) {
    if (!data.typeDescription || data.typeDescription.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Type description is required when "Other" is selected',
        path: ['typeDescription']
      });
    }
  }
});

export const targetsShape = z.object({
  targets: z.array(targetBaseShape)
});

export const targetsSchema = z.object({
  targets: z.array(targetBaseSchema)
});

export type TargetFormData = z.infer<typeof targetsShape>;

// const targetsShapeProps = z.object({
//   ...targetsShape._def.shape
// });

export const isTargetsShape = (
  value: unknown,
  withLogs: boolean = true
): value is TargetFormData => {
  const result = targetsShape.safeParse(value);
  if (result.error && withLogs) {
    logger.error(
      'Invalid response format',
      new Error('Target Shape'),
      constructErrorResponseFromZod(result)
    );
  }
  return result.success;
};

export const isTargetsSchema = (
  value: unknown,
  withLogs: boolean = true
): value is TargetFormData => {
  const result = targetsSchema.safeParse(value);
  if (result.error && withLogs) {
    logger.error(
      'Invalid response format',
      new Error('Target Schema'),
      constructErrorResponseFromZod(result)
    );
  }
  return result.success;
};

export const defaultTargetValues: TargetFormData = {
  targets: [
    {
      id: '',
      title: '',
      description: '',
      targetProgress: [],
      year: NaN,
      baseyear: NaN,
      type: [],
      typeDescription: '',
      value: NaN,
      unit: '',
      status: '',
      updateTarget: null,
      statusReason: ''
    }
  ]
};
