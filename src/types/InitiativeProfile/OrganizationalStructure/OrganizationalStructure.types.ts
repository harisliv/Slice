import { z } from 'zod';
import {
  defaultInvolvedEntitiesFormValues,
  involvedEntitiesShape,
  isInvolvedEntitiesSchema
} from './InvolvedEntities.types.ts';
import {
  defaultOrganizationalArrangementsFormValues,
  isOrganizationalArrangementsShape,
  organizationalArrangementsShape
} from './OrganizationalArrangements.types';
import {
  defaultRelatedInitiativesFormValues,
  isRelatedInitiativesSchema,
  relatedInitiativesShape
} from './RelatedInitiatives.types';

export const organizationalStructureSchema = z.object({
  ...organizationalArrangementsShape.shape,
  ...involvedEntitiesShape.shape,
  ...relatedInitiativesShape.shape
});

export const isOrganizationalStructureSchema = (
  value: unknown,
  withLogs: boolean = true
): value is OrganizationalStructureFormData => {
  const isOrganizationalArrangements = isOrganizationalArrangementsShape(
    value,
    withLogs
  );
  const isInvolvedEntities = isInvolvedEntitiesSchema(value, withLogs);
  const isRelatedInitiatives = isRelatedInitiativesSchema(value, withLogs);
  return (
    isOrganizationalArrangements && isInvolvedEntities && isRelatedInitiatives
  );
};

export type OrganizationalStructureFormData = z.infer<
  typeof organizationalStructureSchema
>;

export const defaultOrganizationalStructureFormValues: OrganizationalStructureFormData =
  {
    ...defaultInvolvedEntitiesFormValues,
    ...defaultOrganizationalArrangementsFormValues,
    ...defaultRelatedInitiativesFormValues
  };
