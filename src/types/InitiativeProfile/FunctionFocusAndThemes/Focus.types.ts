import { logger, stringSchemaMandatoryType } from '@app/utils';
import { constructErrorResponseFromZod } from '@app/utils/error';
import { z } from 'zod';

export const focusesShape = z.object({
  initiativeFocus: stringSchemaMandatoryType(), // climate focus
  initiativeGeographicalFocus: stringSchemaMandatoryType(),
  regions: z.array(z.string()),
  countries: z.array(z.string()) // if is national, single Select, if is multinational, multiSelect
});

export const focusesSuperRefine = (
  data: z.infer<typeof focusesShape>,
  ctx: z.RefinementCtx
) => {
  if (
    data.initiativeGeographicalFocus === 'National' &&
    !data.countries?.length
  ) {
    ctx.addIssue({
      path: ['countries'],
      message: 'Please select one country',
      code: z.ZodIssueCode.custom
    });
  }
  if (
    data.initiativeGeographicalFocus === 'Multinational' &&
    data.countries?.length < 2
  ) {
    ctx.addIssue({
      path: ['countries'],
      message: 'Please select two or more countries',
      code: z.ZodIssueCode.custom
    });
  }
  if (
    data.initiativeGeographicalFocus === 'Regional' &&
    !data.regions?.length
  ) {
    ctx.addIssue({
      path: ['regions'],
      message: 'Please select one or more regions',
      code: z.ZodIssueCode.custom
    });
  }
};

export const focusesSchema = focusesShape.superRefine(focusesSuperRefine);

export type FocusesFormData = z.infer<typeof focusesSchema>;

export const isFocusesShape = (
  data: unknown,
  withLogs: boolean = true
): data is FocusesFormData => {
  const result = focusesShape.safeParse(data);
  if (result.error && withLogs) {
    logger.error(
      'Invalid response format',
      new Error('Focuses'),
      constructErrorResponseFromZod(result)
    );
  }
  return result.success;
};

export const isFocusesSchema = (
  data: unknown,
  withLogs: boolean = true
): data is FocusesFormData => {
  const result = focusesSchema.safeParse(data);
  if (result.error && withLogs) {
    logger.error(
      'Invalid response format',
      new Error('Focuses'),
      constructErrorResponseFromZod(result)
    );
  }
  return result.success;
};

export const defaultFocusesFormValues: FocusesFormData = {
  initiativeFocus: '',
  initiativeGeographicalFocus: '',
  regions: [],
  countries: []
};
