import {
  arrayStringSchemaRequiredType,
  isInvalidString,
  logger,
  stringSchemaOptionalType
} from '@app/utils';
import { constructErrorResponseFromZod } from '@app/utils/error';
import { z } from 'zod';

const leadOrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: stringSchemaOptionalType(),
  country: stringSchemaOptionalType(),
  assignedRoles: arrayStringSchemaRequiredType({
    msg: 'assignedRoles is Required field'
  })
});

export type TleadOrganization = z.infer<typeof leadOrganizationSchema>;

export const involvedEntitiesShape = z.object({
  leadOrganizations: z.array(leadOrganizationSchema),
  signatoriesMembers: z.array(z.string()).min(1, 'Required field'),
  signatoryCriteria: stringSchemaOptionalType({
    maxChars: 300
  }),
  signatoryFollowUps: z.array(z.string()),
  signatoryFollowUpsOther: stringSchemaOptionalType({
    maxChars: 50
  }),
  signatoryRemoval: stringSchemaOptionalType({
    maxChars: 300
  }),
  memberInformation: stringSchemaOptionalType({
    maxChars: 300
  })
});

export const involvedEntitiesSuperRefine = (
  {
    leadOrganizations,
    signatoriesMembers,
    signatoryCriteria,
    signatoryFollowUps,
    signatoryFollowUpsOther,
    memberInformation
  }: z.infer<typeof involvedEntitiesShape>,
  ctx: z.RefinementCtx
) => {
  if (leadOrganizations) {
    if (!Array.isArray(leadOrganizations)) {
      ctx.addIssue({
        path: ['leadOrganizations'],
        message: 'leadOrganizations must be an array',
        code: z.ZodIssueCode.custom
      });
      return;
    }
  }

  if (signatoriesMembers && signatoriesMembers.includes('Signatories')) {
    if (isInvalidString(signatoryCriteria)) {
      ctx.addIssue({
        path: ['signatoryCriteria'],
        message:
          'Please complete signatory criteria when signatories are selected',
        code: z.ZodIssueCode.custom
      });
    }
    if (!signatoryFollowUps || signatoryFollowUps.length === 0) {
      ctx.addIssue({
        path: ['signatoryFollowUps'],
        message:
          'Please select signatory follow ups when signatories are selected',
        code: z.ZodIssueCode.custom
      });
    }
  }
  if (signatoriesMembers && signatoriesMembers.includes('Members')) {
    if (isInvalidString(memberInformation)) {
      ctx.addIssue({
        path: ['memberInformation'],
        message: 'Please complete member information when members are selected',
        code: z.ZodIssueCode.custom
      });
    }
  }
  if (signatoryFollowUps && signatoryFollowUps.includes('Other')) {
    if (isInvalidString(signatoryFollowUpsOther)) {
      ctx.addIssue({
        path: ['signatoryFollowUpsOther'],
        message: 'Please complete Other when selected in signatory follow ups',
        code: z.ZodIssueCode.custom
      });
    }
  }
};

export const involvedEntitiesSchema = involvedEntitiesShape.superRefine(
  involvedEntitiesSuperRefine
);

export type InvolvedEntitiesFormData = z.infer<typeof involvedEntitiesSchema>;

export const isInvolvedEntitiesShape = (
  data: unknown,
  withLogs: boolean = true
): data is InvolvedEntitiesFormData => {
  const result = involvedEntitiesShape.safeParse(data);
  if (result.error && withLogs) {
    logger.error(
      'Invalid response format',
      new Error('InvolvedEntities'),
      constructErrorResponseFromZod(result)
    );
  }
  return result.success;
};

export const isInvolvedEntitiesSchema = (
  data: unknown,
  withLogs: boolean = true
): data is InvolvedEntitiesFormData => {
  const result = involvedEntitiesSchema.safeParse(data);
  if (result.error && withLogs) {
    logger.error(
      'Invalid response format',
      new Error('InvolvedEntities'),
      constructErrorResponseFromZod(result)
    );
  }
  return result.success;
};

export const defaultInvolvedEntitiesFormValues: InvolvedEntitiesFormData = {
  leadOrganizations: [],
  signatoriesMembers: [],
  signatoryCriteria: '',
  signatoryFollowUps: [],
  signatoryFollowUpsOther: '',
  signatoryRemoval: '',
  memberInformation: ''
};
