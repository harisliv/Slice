import { logger } from '@app/utils';
import { constructErrorResponseFromZod } from '@app/utils/error';
import { z } from 'zod';
import {
  defaultFunctionFocusAndThemesFormValues,
  focusesShape,
  functionShape,
  isFunctionFocusAndThemesSchema,
  themesShape
} from './FunctionFocusAndThemes';
import { goalsShape } from './Goals.types';
import {
  defaultGoalsTargetsAndMonitoringFormValues,
  isGoalsTargetsAndMonitoringSchema
} from './GoalsTargetsAndMonitoring.types';
import {
  defaultInitiativeInformationFormValues,
  initiativeInformationShape,
  isInitiativeInformationSchema
} from './InitiativeInformation.types';
import { monitoringShape } from './Monitoring.types';
import {
  defaultOrganizationalStructureFormValues,
  involvedEntitiesShape,
  isOrganizationalStructureSchema,
  organizationalArrangementsShape,
  relatedInitiativesShape
} from './OrganizationalStructure';
import { targetsShape } from './Target.types';

export const initiativeProfileShape = z.object({
  ...initiativeInformationShape.shape,
  ...goalsShape.shape,
  ...targetsShape.shape,
  ...monitoringShape.shape,
  newTargets: targetsShape.shape.targets,
  ...functionShape.shape,
  ...focusesShape.shape,
  ...themesShape.shape,
  ...organizationalArrangementsShape.shape,
  ...involvedEntitiesShape.shape,
  ...relatedInitiativesShape.shape
});

export const defaultInitiativeProfileFormValues: InitiativeProfileFormData = {
  ...defaultInitiativeInformationFormValues,
  ...defaultGoalsTargetsAndMonitoringFormValues,
  ...defaultOrganizationalStructureFormValues,
  ...defaultFunctionFocusAndThemesFormValues
};

export const isInitiativeProfileShape = (
  value: unknown,
  withLogs: boolean = true
): value is InitiativeProfileFormData => {
  const result = initiativeProfileShape.safeParse(value);
  if (result.error && withLogs) {
    logger.error(
      'Invalid response format',
      new Error('Initiative Profile'),
      constructErrorResponseFromZod(result)
    );
  }
  return result.success;
};

export const isInitiativeProfileSchema = (
  value: unknown,
  withLogs: boolean = true
): value is InitiativeProfileFormData => {
  const isInitiativeInformation = isInitiativeInformationSchema(
    value,
    withLogs
  );
  const isGoalsTargetsAndMonitoring = isGoalsTargetsAndMonitoringSchema(
    value,
    withLogs
  );

  const isOrganizationalStructure = isOrganizationalStructureSchema(
    value,
    withLogs
  );

  const isFunctionFocusAndThemes = isFunctionFocusAndThemesSchema(
    value,
    withLogs
  );
  return (
    isInitiativeInformation &&
    isGoalsTargetsAndMonitoring &&
    isOrganizationalStructure &&
    isFunctionFocusAndThemes
  );
};

export type TUploadedFile = {
  id: string | null;
  size: number | null;
  url: string | null;
  name: string | null;
  sharePointId: string | null;
};

export type InitiativeProfileDTO = {
  id: string;
  name: string;
  website: string | null;
  logoBase64: string | null;
  socialProfiles: {
    Facebook?: string | null;
    Twitter?: string | null;
    LinkedIn?: string | null;
    Instagram?: string | null;
    YouTube?: string | null;
  };
  launchDate: number;
  launchEvent: string | null;
  expectedEndDate: number;
  initiativeStatus: string | null;
  explanationStatus: string | null;
  summaryOutcomes: string | null;
  closureReport: TUploadedFile | null;
  contactEmail: string | null;
  contactOrganizations: Array<{
    id: string;
    organizationName: string;
  }> | null;
  initiativePrimaryFunction: string | null;
  initiativePrimaryFunctionOther: string | null;
  initiativeSecondaryFunction: string[] | null;
  initiativeSecondaryFunctionOther: string | null;
  initiativeFocus: string[] | null;
  initiativeGeographicalFocus: string | null;
  regions: string[];
  countries: string[];
  sustainableDevelopmentGoals: string[];
  marrakechPartnershipThemes: string[];
  goalImpactStatement: string | null;
  goalDescription: string | null;
  goalAlignmentParis: string | null;
  goalAlignmentOthers: {
    id?: string;
    agreement: string | null;
    description: string | null;
  }[];
  additionalValue: string | null;
  targets: Array<{
    id?: string | null;
    updateTarget: string | null;
    title: string | null;
    description: string | null;
    status: string | null;
    baseYear: number;
    year: number;
    types: string[];
    customType: string | null;
    unit: string | null;
    value: number;
    targetProgess: Array<{
      id: string | null;
      updateStatus: string | null;
      descriptionStatus: string | null;
      reportValue: number;
      latestReportedYear: number;
      createdOn: string | null;
    }>;
    statusReason: string | null;
  }>;
  monitoringProgress: string | null;
  publicReportingOptions: string[];
  publicReportingOther: string | null;
  periodicalProgressReports: Array<{
    id: string | null;
    title: string | null;
    year: number;
    status: string | null;
    report: TUploadedFile;
  }>;
  organizationalArrangements: string | null;
  dedicatedStaff: string | null;
  staffingInformation: string | null;
  involvedEntities: {
    id?: string;
    entityOperatingName: string;
    accountType: string;
    country: string;
    entityRoles: string[];
  }[];
  signatoriesAndMembers: string[];
  signatoryCriteria: string | null;
  signatoryFollowUps: string[];
  signatoryFollowUpsOther: string | null;
  signatoryRemoval: string | null;
  memberInformation: string | null;
  relatedInitiatives: Array<{
    id?: string;
    relatedInitiativeId: string;
    relatedInitiativeName: string;
    relationshipType: string;
    contactName: string | null;
    contactEmail: string | null;
    validationStatus: string | null;
    needsConfirmation: boolean | null;
  }>;
};

export type InitiativeProfileFormData = z.infer<typeof initiativeProfileShape>;
