import {
  type ProgressReportingDTO,
  type TProgressReportingData,
  type TProgressReportingShape,
  type TProgressReportingTableActions,
  isActionSchema,
  isChallengesAndOpportunitiesSchema,
  isProgressOfTargetsSchema,
  isTimeframeOfInformationSchema
} from '@app/types';
import { StepStatus, TagStatus } from '@app/lib/types';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import {
  formatDate,
  normalizeDateTime,
  normalizeNumber,
  normalizeString
} from './general';

const dateFormat: string = 'DD/MM/YYYY';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(customParseFormat);

function hasOverlap(
  arr1: [string, string][],
  newStart: string,
  newEnd: string
) {
  const start = dayjs(newStart, dateFormat);
  const end = dayjs(newEnd, dateFormat);

  return arr1.some(([s, e]) => {
    const rangeStart = dayjs(s, dateFormat);
    const rangeEnd = dayjs(e, dateFormat);

    return start.isSameOrBefore(rangeEnd) && end.isSameOrAfter(rangeStart);
  });
}

export const hasErrorRange = (
  ranges: [string, string][],
  dateString: string | null
) => {
  if (!ranges || !ranges.length || !dateString) {
    return false;
  }

  const startDateValue = dayjs(dateString).format(dateFormat);
  const endDate =
    startDateValue &&
    dayjs(startDateValue, dateFormat)
      .add(1, 'year')
      .subtract(1, 'day')
      .format(dateFormat);

  return hasOverlap(ranges, startDateValue, endDate);
};

export const findFirstAvailableSlot = (
  allProgressReportsDateRanges: [string, string][]
) => {
  const getCurrentAcademicYearStart = () => {
    const now = dayjs();
    const previousYear = now.year() - 1;
    return dayjs().year(previousYear).month(8).date(1);
  };

  if (allProgressReportsDateRanges.length === 0) {
    return getCurrentAcademicYearStart().toISOString();
  }

  const sortedRanges = allProgressReportsDateRanges
    .map(([start, end]) => ({
      start: dayjs(start, dateFormat),
      end: dayjs(end, dateFormat)
    }))
    .sort((a, b) => a.start.valueOf() - b.start.valueOf());

  let candidateYear = getCurrentAcademicYearStart().year();

  while (true) {
    const candidateStart = dayjs().year(candidateYear).month(8).date(1);
    const candidateEnd = candidateStart.add(1, 'year').month(7).date(31);

    const hasConflict = sortedRanges.some(
      (range) =>
        candidateStart.isSameOrBefore(range.end) &&
        candidateEnd.isSameOrAfter(range.start)
    );

    if (!hasConflict) {
      return candidateStart.toISOString();
    }

    candidateYear++;
  }
};

const mapStatusToTagStatus = (
  status: ProgressReportingDTO['reportStatus']
): TagStatus => {
  switch (status) {
    case 'Draft':
      return TagStatus.DRAFT;
    case 'Submitted':
      return TagStatus.SUBMITTED;
    default:
      return TagStatus.DRAFT;
  }
};

const mapStatusToActions = (
  status: ProgressReportingDTO['reportStatus']
): TProgressReportingTableActions[] => {
  switch (status) {
    case 'Draft':
      return ['EDIT', 'DELETE'];
    case 'Submitted':
      return ['VIEW'];
    default:
      return [];
  }
};

export const getStepStatusArray = (
  progressReporting: TProgressReportingShape
): StepStatus[] => {
  const step1 = isTimeframeOfInformationSchema(progressReporting);
  const step2 = isActionSchema(progressReporting);
  const step3 = isProgressOfTargetsSchema(progressReporting);
  const step4 = isChallengesAndOpportunitiesSchema(progressReporting);

  return [
    step1 ? StepStatus.COMPLETED : StepStatus.INACTIVE,
    step2
      ? StepStatus.COMPLETED
      : step1
        ? StepStatus.ACTIVE
        : StepStatus.INACTIVE,
    step3
      ? StepStatus.COMPLETED
      : step2
        ? StepStatus.ACTIVE
        : StepStatus.INACTIVE,
    step4
      ? StepStatus.COMPLETED
      : step3
        ? StepStatus.ACTIVE
        : StepStatus.INACTIVE,
    step1 && step2 && step3 && step4
      ? StepStatus.COMPLETED
      : StepStatus.INACTIVE
  ];
};

export const convertToTableData = (
  data: ProgressReportingDTO[]
): TProgressReportingData[] =>
  data.map((item) => ({
    id: item.id ?? '',
    timeframeOfInformation: `${formatDate(item.reportingStartDate)} to ${formatDate(item.reportingEndDate)}`,
    draftLatestUpdate: formatDate(item?.submissionOrDraftDate ?? null),
    reportingStatus: mapStatusToTagStatus(item.reportStatus),
    actions: mapStatusToActions(item.reportStatus)
  }));

export const convertToClientEntity = (
  dto: ProgressReportingDTO
): TProgressReportingShape => ({
  id: dto.id,
  timeframeOfInformation: normalizeString(dto.custom),
  startDate: dto.reportingStartDate ?? '',
  endDate: normalizeDateTime(dto.reportingEndDate),
  draftLatestUpdate: normalizeDateTime(dto.submissionOrDraftDate),
  typesOfChallengesFaced: dto.typesOfChallengesFaced ?? [],
  othersTypesOfChallengesFaced: normalizeString(
    dto.othersTypesOfChallengesFaced
  ),
  descriptionOfChallenges: normalizeString(dto.descriptionOfChallenges),
  descriptionOfOpportunitiesIdentified: normalizeString(
    dto.descriptionOfOpportunitiesIdentified
  ),
  actions:
    dto.actions?.map((action) => ({
      id: action.id,
      title: normalizeString(action.title),
      description: normalizeString(action.description),
      typeOfAction: normalizeString(action.type),
      typeOther: normalizeString(action.typeOther),
      associatedTargets: action.targets,
      outcomes: normalizeString(action.outcomes),
      outcomesUrl: action.outcomesUrl ?? [''],
      impactExplanation: normalizeString(action.impactExplanation),
      contributionToMultilateralProcess:
        action.actionToTheMultilateralPro ?? [],
      contributionOfTheAction: normalizeString(action.contributionOfTheAction)
    })) ?? [],
  targets:
    dto.targets?.map((target) => ({
      baseYear: normalizeNumber(target.baseYear),
      description: normalizeString(target.description),
      descriptionStatus: normalizeString(target.descriptionStatus),
      id: target.id,
      targetId: target.targetId,
      latestReportedYear: normalizeNumber(target.latestReportedYear),
      reportValue: normalizeNumber(target.reportValue),
      status: normalizeString(target.status),
      title: normalizeString(target.title),
      types: target.types ?? [],
      unit: normalizeString(target.unit),
      updateStatus: normalizeString(target.updateStatus),
      value: normalizeNumber(target.value),
      year: normalizeNumber(target.year)
    })) ?? []
});

export const convertToServerEntity = (
  formData: TProgressReportingShape
): ProgressReportingDTO => ({
  initiativeId: formData.initiativeId,
  ...(formData.id && formData.id.length > 0 ? { id: formData.id } : {}),
  targets: formData.targets,
  reportStatus: formData.reportStatus || 'Draft',
  custom: formData.timeframeOfInformation,
  reportingStartDate: formData.startDate,
  reportingEndDate: (() => {
    if (!formData.startDate) {
      return null;
    }
    const startDate = dayjs(formData.startDate);
    const endDate = startDate.add(1, 'year').subtract(1, 'day');
    return endDate.toISOString();
  })(),
  submissionOrDraftDate: new Date().toISOString(),
  typesOfChallengesFaced: formData.typesOfChallengesFaced ?? [],
  othersTypesOfChallengesFaced: formData.othersTypesOfChallengesFaced || null,
  descriptionOfChallenges: formData.descriptionOfChallenges || null,
  descriptionOfOpportunitiesIdentified:
    formData.descriptionOfOpportunitiesIdentified || null,
  actions:
    formData?.actions?.length > 0
      ? formData.actions.map((action) => ({
          ...(action.id && action.id.length > 0 ? { id: action.id } : {}),
          title: action.title,
          description: action.description,
          type: action.typeOfAction,
          typeOther: action.typeOther,
          impactExplanation: action.impactExplanation,
          outcomes: action.outcomes,
          outcomesUrl: action.outcomesUrl ?? [],
          contributionOfTheAction: action.contributionOfTheAction,
          actionToTheMultilateralPro: action.contributionToMultilateralProcess,
          targets: action.associatedTargets ?? []
        }))
      : []
});
