import {
  logger,
  stringSchemaMandatoryType,
  stringSchemaOptionalType,
  yearMandatorySchemaType
} from '@app/utils';
import { constructErrorResponseFromZod } from '@app/utils/error';
import { z } from 'zod';

const periodicalProgressReportShape = z.object({
  id: stringSchemaOptionalType(),
  report: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    size: z.number().nullable(),
    url: z.string().nullable(),
    sharePointId: z.string().nullable()
  }),
  title: stringSchemaMandatoryType({
    maxChars: 100
  }),
  year: yearMandatorySchemaType(),
  status: stringSchemaOptionalType()
});

export const monitoringShape = z.object({
  progress: stringSchemaMandatoryType({
    maxChars: 3000
  }),
  publicReportingOptions: z.object({
    checkbox1: z.boolean(),
    checkbox2: z.boolean(),
    checkbox3: z.boolean()
  }),
  publicReportingOther: stringSchemaOptionalType({
    maxChars: 300
  }),
  periodicalProgressReport: z.array(periodicalProgressReportShape)
});

export const monitoringSuperRefine = (
  data: z.infer<typeof monitoringShape>,
  ctx: z.RefinementCtx
) => {
  if (
    !data.publicReportingOptions.checkbox1 &&
    !data.publicReportingOptions.checkbox2 &&
    !data.publicReportingOptions.checkbox3
  ) {
    ctx.addIssue({
      path: ['publicReportingOptions'],
      message: 'Please complete at least one of the required fields',
      code: z.ZodIssueCode.custom
    });
  }
  if (data.publicReportingOptions.checkbox2) {
    if (
      !data.periodicalProgressReport ||
      data.periodicalProgressReport.length === 0
    ) {
      ctx.addIssue({
        path: ['periodicalProgressReport'],
        message: 'Please complete the Report',
        code: z.ZodIssueCode.custom
      });
    }
  }
  if (data.publicReportingOptions.checkbox3) {
    if (
      !data.publicReportingOther ||
      data.publicReportingOther.trim().length === 0
    ) {
      ctx.addIssue({
        path: ['publicReportingOther'],
        message: 'Please complete Other when checkbox is clicked',
        code: z.ZodIssueCode.custom
      });
    }
  }
};

export const monitoringSchema = monitoringShape.superRefine(
  monitoringSuperRefine
);

export type MonitoringFormData = z.infer<typeof monitoringSchema>;

// const monitoringShapeProps = z.object({
//   ...monitoringShape._def.shape
// });

export const isMonitoringShape = (
  data: unknown,
  withLogs: boolean = true
): data is MonitoringFormData => {
  const result = monitoringShape.safeParse(data);
  if (result.error && withLogs) {
    logger.error(
      'Invalid response format',
      new Error('Monitoring'),
      constructErrorResponseFromZod(result)
    );
  }
  return result.success;
};

export const isMonitoringSchema = (
  data: unknown,
  withLogs: boolean = true
): data is MonitoringFormData => {
  const result = monitoringSchema.safeParse(data);
  if (result.error && withLogs) {
    logger.error(
      'Invalid response format',
      new Error('Monitoring'),
      constructErrorResponseFromZod(result)
    );
  }
  return result.success;
};

export const defaultMonitoringFormValues: MonitoringFormData = {
  progress: '',
  publicReportingOptions: {
    checkbox1: false,
    checkbox2: false,
    checkbox3: false
  },
  publicReportingOther: '',
  periodicalProgressReport: [
    {
      id: null,
      report: {
        id: null,
        name: null,
        size: NaN,
        url: null,
        sharePointId: null
      },
      title: '',
      year: NaN,
      status: null
    }
  ]
};

export const ReportSchema = monitoringShape.pick({
  periodicalProgressReport: true
});

export const isReportFormData = (data: unknown) =>
  periodicalProgressReportShape.safeParse(data).success;

export type ReportFormData = z.infer<typeof ReportSchema>;
