import { logger, stringSchemaMandatoryType } from '@app/utils';
import { constructErrorResponseFromZod } from '@app/utils/error';
import { z } from 'zod';

export const timeframeOfInformationShape = z.object({
  timeframeOfInformation: stringSchemaMandatoryType(),
  startDate: z
    .string({ message: 'Start date is required' })
    .datetime({ message: 'Start date is required' }),
  endDate: z.string().datetime().nullable(),
  draftLatestUpdate: z.string().datetime().optional().nullable()
});

export const timeframeOfInformationSchema = timeframeOfInformationShape.refine(
  (data) => {
    if (data.timeframeOfInformation === 'Custom' && 'startDate' in data) {
      return data.startDate !== null;
    }
    return true;
  },
  {
    message: 'Start date is required',
    path: ['startDate']
  }
);

export type TimeframeOfInformationFormData = z.infer<
  typeof timeframeOfInformationSchema
>;

// const timeframeOfInformationShapeProps = z.object({
//   ...timeframeOfInformationShape._def.shape
// });

export const isTimeframeOfInformationShape = (
  value: unknown,
  withLogs: boolean = true
): value is TimeframeOfInformationFormData => {
  const result = timeframeOfInformationShape.safeParse(value);
  if (result.error && withLogs) {
    logger.error(
      'Invalid response format',
      new Error('Timeframe of Information'),
      constructErrorResponseFromZod(result)
    );
  }
  return result.success;
};

export const isTimeframeOfInformationSchema = (
  value: unknown,
  withLogs: boolean = true
): value is TimeframeOfInformationFormData => {
  const result = timeframeOfInformationSchema.safeParse(value);
  if (result.error && withLogs) {
    logger.error(
      'Invalid response format',
      new Error('Timeframe of Information'),
      constructErrorResponseFromZod(result)
    );
  }
  return result.success;
};

export const defaultTimeframeOfInformationFormValues: TimeframeOfInformationFormData =
  {
    timeframeOfInformation: '',
    startDate: '',
    draftLatestUpdate: null,
    endDate: null
  };
