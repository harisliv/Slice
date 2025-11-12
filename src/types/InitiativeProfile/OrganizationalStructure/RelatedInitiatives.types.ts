import {
  logger,
  stringSchemaMandatoryType,
  stringSchemaOptionalType
} from '@app/utils';
import { constructErrorResponseFromZod } from '@app/utils/error';
import { z } from 'zod';

export const validationStatusSchema = z.enum(['Pending', 'Yes', 'No']);

export type ValidationStatus = z.infer<typeof validationStatusSchema>;

export const isValidationStatusSchema = (
  data: unknown
): data is ValidationStatus => {
  const result = validationStatusSchema.safeParse(data);
  return result.success;
};

export const tempOptionSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().optional()
  })
  .optional();

export const tempValidationsSchema = z
  .record(stringSchemaMandatoryType())
  .optional();

export const relatedInitiativeSchema = z.object({
  id: z.string().nullable(),
  relatedInitiativeId: z.string(),
  relatedInitiativeName: z.string(),
  relationshipType: stringSchemaMandatoryType(),
  contactName: stringSchemaOptionalType({ maxChars: 200 }),
  contactEmail: stringSchemaOptionalType(), // TODO REVERT THIS
  validationStatus: validationStatusSchema,
  needsConfirmation: z.boolean().nullable()
});

export const relatedInitiativesShape = z.object({
  relatedInitiatives: z.array(relatedInitiativeSchema),
  tempOption: tempOptionSchema,
  tempValidations: tempValidationsSchema,
  tempRelationshipType: z.string().optional()
});

export type RelatedInitiativesFormData = z.infer<
  typeof relatedInitiativesShape
>;
export type RelatedInitiative = z.infer<typeof relatedInitiativeSchema>;
export type TempOption = z.infer<typeof tempOptionSchema>;
export type TempValidations = z.infer<typeof tempValidationsSchema>;

export const defaultRelatedInitiativesFormValues: RelatedInitiativesFormData = {
  relatedInitiatives: []
};

export const isRelatedInitiativesSchema = (
  data: unknown,
  withLogs: boolean = true
): data is RelatedInitiativesFormData => {
  const result = relatedInitiativesShape.safeParse(data);
  if (result.error && withLogs) {
    logger.error(
      'Invalid response format',
      new Error('RelatedInitiatives'),
      constructErrorResponseFromZod(result)
    );
  }
  return result.success;
};

export type TempModalPayload = TempOption & { relationshipType: string };
