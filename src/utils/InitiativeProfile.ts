import { MONITORING_FIELD_INFO } from '@app/constants';
import {
  isFunctionFocusAndThemesSchema,
  isGoalsTargetsAndMonitoringSchema,
  isInitiativeInformationSchema,
  isOrganizationalStructureSchema,
  isValidationStatusSchema,
  type InitiativeProfileDTO,
  type InitiativeProfileFormData,
  type RelatedInitiative
} from '@app/types';
import { StepStatus, TagStatus } from '@app/lib/types';
import {
  convertToValidEmail,
  convertToValidUrl,
  normalizeNumber,
  normalizeString
} from './general';

export const getStepStatusArray = (
  initiativeProfile: InitiativeProfileFormData
): StepStatus[] => {
  return [
    isInitiativeInformationSchema(initiativeProfile)
      ? StepStatus.COMPLETED
      : StepStatus.ACTIVE,
    isGoalsTargetsAndMonitoringSchema(initiativeProfile)
      ? StepStatus.COMPLETED
      : StepStatus.ACTIVE,
    isOrganizationalStructureSchema(initiativeProfile)
      ? StepStatus.COMPLETED
      : StepStatus.ACTIVE,
    isFunctionFocusAndThemesSchema(initiativeProfile)
      ? StepStatus.COMPLETED
      : StepStatus.ACTIVE
  ];
};

export const mapStatus = (target: InitiativeProfileFormData['targets'][0]) => {
  const { statusReason, status } = target;

  if (statusReason?.toLowerCase() === 'inactive') {
    return TagStatus.INACTIVE;
  }

  if (statusReason?.toLowerCase() === 'active') {
    if (status?.includes('accomplished')) {
      return TagStatus.ACCOMPLISHED;
    }
    if (status?.includes('no longer active')) {
      return TagStatus.INACTIVE;
    }
    if (status?.includes('halfway') || !status || status === '') {
      return TagStatus.ACTIVE;
    }
  }

  return 'undefinedStatus';
};

export const isStatusKey = (key: string): key is keyof StatusOrder => {
  return ['ACTIVE', 'ACCOMPLISHED', 'INACTIVE', 'undefinedStatus'].includes(
    key
  );
};

type StatusOrder = {
  ACTIVE: number;
  ACCOMPLISHED: number;
  INACTIVE: number;
  undefinedStatus: number;
};

export const statusOrder: StatusOrder = {
  ACTIVE: 1,
  ACCOMPLISHED: 2,
  INACTIVE: 3,
  undefinedStatus: 4
};

export const mapPublicReportingOptions = (options: {
  checkbox1: boolean;
  checkbox2: boolean;
  checkbox3: boolean;
}): string[] => {
  const result: string[] = [];

  if (options.checkbox1) {
    result.push(MONITORING_FIELD_INFO.publicReportingOptions.fields.checkbox1);
  }
  if (options.checkbox2) {
    result.push(MONITORING_FIELD_INFO.publicReportingOptions.fields.checkbox2);
  }
  if (options.checkbox3) {
    result.push(MONITORING_FIELD_INFO.publicReportingOptions.fields.checkbox3);
  }

  return result;
};

export const filterManualRelatedInitiatives = (
  relatedInitiatives?: RelatedInitiative[]
) => relatedInitiatives?.filter((ri) => !ri.needsConfirmation);

export const filterRelationshipRelatedInitiatives = (
  relatedInitiatives?: RelatedInitiative[]
) => relatedInitiatives?.filter((ri) => ri.needsConfirmation);

const publicReportingOptions = {
  1: 'The Cooperative Climate Initiative will fully participate in GCAP’s annual Cooperative Climate Initiative progress tracking process',
  2: 'The Cooperative Climate Initiative publishes periodical progress reports (at least annually) regarding its work',
  3: 'The Cooperative Climate Initiative reports progress in another way'
};

export const convertToClientEntity = (
  value: InitiativeProfileDTO
): InitiativeProfileFormData => ({
  id: value.id,
  name: value.name,
  website: value.website ? convertToValidUrl(value.website) : null,
  logoBase64: value.logoBase64,
  socialProfiles: value.socialProfiles,
  launchDate: normalizeNumber(value.launchDate),
  launchEvent: normalizeString(value.launchEvent),
  expectedEndDate: normalizeNumber(value.expectedEndDate),
  initiativeStatus: normalizeString(value.initiativeStatus),
  explanationStatus: normalizeString(value.explanationStatus),
  summaryOutcomes: normalizeString(value.summaryOutcomes),
  closureReport: value.closureReport,
  contactEmail: convertToValidEmail(value.contactEmail || ''),
  contactOrganizations:
    value.contactOrganizations?.map((organization) => ({
      label: organization.organizationName,
      value: organization.id
    })) || [],
  climateRelatedGoalImpactStatement: normalizeString(value.goalImpactStatement),
  climateRelatedGoalDescription: normalizeString(value.goalDescription),
  climateRelatedGoalAlignmentParis: normalizeString(value.goalAlignmentParis),
  climateRelatedGoalAlignmentMultilateral: value.goalAlignmentOthers ?? [],
  climateRelatedGoalAlignmentOtherDescription:
    'The Cooperative Climate Initiative does not have any dedicated staff', // TODO REMOVE THIS
  additionalValueInitiative: normalizeString(value.additionalValue),
  newTargets: [],
  targets:
    value.targets.length > 0
      ? value.targets.map((target) => ({
          id: target.id || null,
          title: normalizeString(target.title),
          description: normalizeString(target.description),
          type: target.types,
          typeDescription: normalizeString(target.customType),
          unit: normalizeString(target.unit),
          value: normalizeNumber(target.value),
          baseyear: normalizeNumber(target.baseYear),
          year: normalizeNumber(target.year),
          status: normalizeString(target.status),
          targetProgress: target.targetProgess,
          updateTarget: target.updateTarget ?? null,
          statusReason: target.statusReason ?? null
        }))
      : [],
  progress: normalizeString(value.monitoringProgress),
  publicReportingOptions: {
    checkbox1: value.publicReportingOptions.includes(publicReportingOptions[1]),
    checkbox2: value.publicReportingOptions.includes(publicReportingOptions[2]),
    checkbox3: value.publicReportingOptions.includes(publicReportingOptions[3])
  },
  publicReportingOther: normalizeString(value.publicReportingOther),
  periodicalProgressReport:
    value.periodicalProgressReports.length > 0
      ? value.periodicalProgressReports.map((report) => ({
          id: normalizeString(report.id),
          status: normalizeString(report.status),
          title: normalizeString(report.title),
          year: normalizeNumber(report.year),
          report: report.report || {
            id: null,
            name: null,
            size: null,
            url: null,
            sharePointId: null
          }
        }))
      : [],
  initiativePrimaryFunction: normalizeString(value.initiativePrimaryFunction),
  initiativePrimaryFunctionOther: normalizeString(
    value.initiativePrimaryFunctionOther
  ),
  initiativeSecondaryFunction: value.initiativeSecondaryFunction || [],
  initiativeSecondaryFunctionOther: normalizeString(
    value.initiativeSecondaryFunctionOther
  ),
  initiativeFocus: normalizeString(value.initiativeFocus?.[0]), // TODO FIX THAT
  initiativeGeographicalFocus: normalizeString(
    value.initiativeGeographicalFocus
  ),
  regions: value.regions || [],
  countries: value.countries || [],
  marrakechPartnershipThemes: value.marrakechPartnershipThemes || [],
  sustainableDevelopmentGoals: value.sustainableDevelopmentGoals || [],
  organizationalArrangements: normalizeString(value.organizationalArrangements),
  dedicatedStaff: normalizeString(value.dedicatedStaff),
  staffingInformation: normalizeString(value.staffingInformation),
  signatoryCriteria: normalizeString(value.signatoryCriteria),
  signatoryFollowUpsOther: normalizeString(value.signatoryFollowUpsOther),
  signatoryRemoval: normalizeString(value.signatoryRemoval),
  memberInformation: normalizeString(value.memberInformation),
  leadOrganizations: value.involvedEntities.map((entity) => ({
    id: entity.id || '',
    name: entity.entityOperatingName,
    type: entity.accountType,
    country: entity.country,
    assignedRoles: entity.entityRoles
  })),
  signatoriesMembers: value.signatoriesAndMembers || [],
  signatoryFollowUps: value.signatoryFollowUps || [],
  relatedInitiatives:
    value.relatedInitiatives.length > 0
      ? value.relatedInitiatives.map((ri) => ({
          id: normalizeString(ri.id),
          relatedInitiativeId: normalizeString(ri.relatedInitiativeId),
          relatedInitiativeName: normalizeString(ri.relatedInitiativeName),
          relationshipType: normalizeString(ri.relationshipType),
          contactName: normalizeString(ri.contactName),
          contactEmail: normalizeString(ri.contactEmail),
          validationStatus: isValidationStatusSchema(ri.validationStatus)
            ? ri.validationStatus
            : 'Pending',
          needsConfirmation: ri.needsConfirmation
        }))
      : []
});

export const convertToServerEntity = (
  value: InitiativeProfileFormData
): InitiativeProfileDTO => ({
  id: value.id,
  name: value.name,
  website: normalizeString(value.website),
  logoBase64: value.logoBase64,
  socialProfiles: value.socialProfiles,
  launchDate: normalizeNumber(value.launchDate),
  launchEvent: normalizeString(value.launchEvent),
  expectedEndDate: normalizeNumber(value.expectedEndDate),
  initiativeStatus: normalizeString(value.initiativeStatus),
  explanationStatus: normalizeString(value.explanationStatus),
  summaryOutcomes: normalizeString(value.summaryOutcomes),
  closureReport: value.closureReport || null,
  contactEmail: value.contactEmail,
  contactOrganizations:
    value.contactOrganizations?.length > 0
      ? value.contactOrganizations.map((organization) => ({
          id: organization.value,
          organizationName: organization.label
        }))
      : [],
  initiativePrimaryFunction: normalizeString(value.initiativePrimaryFunction),
  initiativePrimaryFunctionOther: normalizeString(
    value.initiativePrimaryFunctionOther
  ),
  initiativeSecondaryFunction: value.initiativeSecondaryFunction || [],
  initiativeSecondaryFunctionOther: normalizeString(
    value.initiativeSecondaryFunctionOther
  ),
  initiativeFocus: value.initiativeFocus ? [value.initiativeFocus] : [],
  initiativeGeographicalFocus: normalizeString(
    value.initiativeGeographicalFocus
  ),
  regions: value.regions || [],
  countries: value.countries || [],
  marrakechPartnershipThemes: value.marrakechPartnershipThemes || [],
  sustainableDevelopmentGoals: value.sustainableDevelopmentGoals || [],
  goalImpactStatement: normalizeString(value.climateRelatedGoalImpactStatement),
  goalDescription: normalizeString(value.climateRelatedGoalDescription),
  goalAlignmentParis: normalizeString(value.climateRelatedGoalAlignmentParis),
  goalAlignmentOthers:
    !!value?.climateRelatedGoalAlignmentMultilateral?.length &&
    value?.climateRelatedGoalAlignmentMultilateral?.length > 0
      ? value.climateRelatedGoalAlignmentMultilateral
      : [],
  additionalValue: normalizeString(value.additionalValueInitiative),
  targets: [],
  monitoringProgress: normalizeString(value.progress),
  publicReportingOptions: [
    ...(value.publicReportingOptions.checkbox1
      ? [publicReportingOptions[1]]
      : []),
    ...(value.publicReportingOptions.checkbox2
      ? [publicReportingOptions[2]]
      : []),
    ...(value.publicReportingOptions.checkbox3
      ? [publicReportingOptions[3]]
      : [])
  ],
  publicReportingOther: normalizeString(value.publicReportingOther),
  periodicalProgressReports:
    value.periodicalProgressReport?.length > 0 &&
    value.publicReportingOptions.checkbox2
      ? value.periodicalProgressReport.map((r) => ({
          id: r.id === '' ? null : r.id,
          report: r.report,
          title: normalizeString(r.title),
          year: normalizeNumber(r.year),
          status: r.status || 'Draft'
        }))
      : [],
  organizationalArrangements: normalizeString(value.organizationalArrangements),
  dedicatedStaff: normalizeString(value.dedicatedStaff),
  staffingInformation: normalizeString(value.staffingInformation),
  involvedEntities: value.leadOrganizations.map((entity) => ({
    ...(entity.id ? { id: entity.id } : {}),
    entityOperatingName: entity.name,
    accountType: entity.type || '',
    country: entity.country || '',
    entityRoles: entity.assignedRoles
  })),
  signatoriesAndMembers: value.signatoriesMembers || [],
  signatoryCriteria: normalizeString(value.signatoryCriteria),
  signatoryFollowUps: value.signatoryFollowUps || [],
  signatoryFollowUpsOther: normalizeString(value.signatoryFollowUpsOther),
  signatoryRemoval: normalizeString(value.signatoryRemoval),
  memberInformation: normalizeString(value.memberInformation),
  relatedInitiatives:
    value.relatedInitiatives?.map((initiative) => ({
      ...(initiative.id ? { id: initiative.id } : {}),
      relatedInitiativeId: normalizeString(initiative.relatedInitiativeId),
      relatedInitiativeName: normalizeString(initiative.relatedInitiativeName),
      relationshipType: normalizeString(initiative.relationshipType),
      contactName: normalizeString(initiative.contactName),
      contactEmail: normalizeString(initiative.contactEmail),
      validationStatus: initiative.validationStatus,
      needsConfirmation: initiative.needsConfirmation
    })) || []
});
