import {
  logger,
  numberOptionalSchemaType,
  stringSchemaMandatoryType,
  stringSchemaOptionalType,
  yearOptionalSchemaType
} from '@app/utils';
import { constructErrorResponseFromZod } from '@app/utils/error';
import { z } from 'zod';

export const progressOfTargetsBaseShape = z.object({
  reportValue: numberOptionalSchemaType,
  updateStatus: stringSchemaMandatoryType(),
  descriptionStatus: stringSchemaMandatoryType({
    maxChars: 500
  }),
  baseYear: yearOptionalSchemaType,
  description: stringSchemaOptionalType(),
  id: stringSchemaOptionalType(),
  targetId: stringSchemaOptionalType(),
  latestReportedYear: yearOptionalSchemaType,
  status: stringSchemaOptionalType(),
  title: stringSchemaOptionalType(),
  types: z.array(z.string()).nullable(),
  unit: stringSchemaOptionalType(),
  value: numberOptionalSchemaType,
  year: yearOptionalSchemaType
});

export const progressOfTargetsShape = z.object({
  targets: z.array(progressOfTargetsBaseShape)
});

export const progressOfTargetsSchema = progressOfTargetsShape.superRefine(
  (data, ctx) => {
    data.targets.forEach((target) => {
      if (
        target.value !== undefined &&
        target.value !== null &&
        !Number.isNaN(target.value)
      ) {
        if (
          target.reportValue === undefined ||
          target.reportValue === null ||
          Number.isNaN(target.reportValue)
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Report Value is mandatory if there is target value',
            path: ['reportValue']
          });
        }
      }
    });
  }
);

export type ProgressOfTargetsFormData = z.infer<typeof progressOfTargetsSchema>;

export const isProgressOfTargetsSchema = (
  value: unknown,
  withLogs: boolean = true
): value is ProgressOfTargetsFormData => {
  const result = progressOfTargetsSchema.safeParse(value);
  if (result.error && withLogs) {
    logger.error(
      'Invalid response format',
      new Error('Progress of targets'),
      constructErrorResponseFromZod(result)
    );
  }
  return result.success;
};

export const defaultTProgressOfTargetsFormValues: ProgressOfTargetsFormData = {
  targets: [
    {
      reportValue: NaN,
      updateStatus: '',
      descriptionStatus: '',
      baseYear: NaN,
      description: '',
      id: '',
      targetId: null,
      latestReportedYear: NaN,
      status: '',
      title: '',
      types: [''],
      unit: '',
      value: NaN,
      year: NaN
    }
  ]
};
