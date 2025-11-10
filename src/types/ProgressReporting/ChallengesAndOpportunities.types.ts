import { logger, stringSchemaOptionalType } from '@app/utils';
import { constructErrorResponseFromZod } from '@app/utils/error';
import { z } from 'zod';

export const challengesAndOpportunitiesShape = z.object({
  typesOfChallengesFaced: z
    .array(z.string())
    .min(1, 'At least one challenge type must be selected')
    .max(2, 'Maximum of two challenge types can be selected'),
  othersTypesOfChallengesFaced: stringSchemaOptionalType({
    maxChars: 100
  }),
  descriptionOfChallenges: stringSchemaOptionalType({
    maxChars: 1500
  }),
  descriptionOfOpportunitiesIdentified: stringSchemaOptionalType({
    maxChars: 1500
  })
});

export const challengesAndOpportunitiesSchema =
  challengesAndOpportunitiesShape.superRefine((data, ctx) => {
    if (
      data.typesOfChallengesFaced.includes('Other') &&
      (!data.othersTypesOfChallengesFaced ||
        data.othersTypesOfChallengesFaced.trim() === '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please specify other types of challenges faced',
        path: ['othersTypesOfChallengesFaced']
      });
    }
  });

export type ChallengesAndOpportunitiesFormData = z.infer<
  typeof challengesAndOpportunitiesSchema
>;

export const isChallengesAndOpportunitiesSchema = (
  value: unknown,
  withLogs: boolean = true
): value is ChallengesAndOpportunitiesFormData => {
  const result = challengesAndOpportunitiesSchema.safeParse(value);
  if (result.error && withLogs) {
    logger.error(
      'Invalid response format',
      new Error('Challenges and opportunities'),
      constructErrorResponseFromZod(result)
    );
  }
  return result.success;
};

export const defaultChallengesAndOpportunitiesFormValues: ChallengesAndOpportunitiesFormData =
  {
    typesOfChallengesFaced: [],
    othersTypesOfChallengesFaced: '',
    descriptionOfChallenges: '',
    descriptionOfOpportunitiesIdentified: ''
  };
