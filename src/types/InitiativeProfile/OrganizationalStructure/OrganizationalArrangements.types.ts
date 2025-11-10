import {
  logger,
  stringSchemaMandatoryType,
  stringSchemaOptionalType
} from '@app/utils';
import { constructErrorResponseFromZod } from '@app/utils/error';
import { z } from 'zod';

export const organizationalArrangementsShape = z.object({
  organizationalArrangements: stringSchemaMandatoryType({
    maxChars: 2000
  }),
  dedicatedStaff: stringSchemaMandatoryType(),
  staffingInformation: stringSchemaOptionalType({
    maxChars: 200
  })
});

export const organizationalArrangementsSchema = organizationalArrangementsShape;

export type OrganizationalArrangementsFormData = z.infer<
  typeof organizationalArrangementsSchema
>;

export const isOrganizationalArrangementsShape = (
  data: unknown,
  withLogs: boolean = true
): data is OrganizationalArrangementsFormData => {
  const result = organizationalArrangementsShape.safeParse(data);
  if (result.error && withLogs) {
    logger.error(
      'Invalid response format',
      new Error('OrganizationalArrangements'),
      constructErrorResponseFromZod(result)
    );
  }
  return result.success;
};

export const defaultOrganizationalArrangementsFormValues: OrganizationalArrangementsFormData =
  {
    organizationalArrangements: '',
    dedicatedStaff: '',
    staffingInformation: ''
  };
