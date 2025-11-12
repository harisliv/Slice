import { logger } from '@app/utils';
import { constructErrorResponseFromZod } from '@app/utils/error';
import type { TagStatus } from '@app/lib/types';
import { z } from 'zod';
import {
  actionShape,
  defaultActionValues,
  isActionSchema
} from './Action.types';
import {
  challengesAndOpportunitiesShape,
  defaultChallengesAndOpportunitiesFormValues,
  isChallengesAndOpportunitiesSchema
} from './ChallengesAndOpportunities.types';
import {
  defaultTProgressOfTargetsFormValues,
  isProgressOfTargetsSchema,
  progressOfTargetsShape
} from './ProgressOfTargets.types';
import {
  defaultTimeframeOfInformationFormValues,
  isTimeframeOfInformationSchema,
  timeframeOfInformationShape
} from './TimeFrameOfInformation.types';

export const progressReportingShape = z.object({
  id: z.string().optional(),
  ...timeframeOfInformationShape.shape,
  ...actionShape.shape,
  ...progressOfTargetsShape.shape,
  ...challengesAndOpportunitiesShape.shape
});

export const isProgressReportingShape = (
  value: unknown
): value is TProgressReportingShape => {
  const result = progressReportingShape.safeParse(value);
  if (result.error) {
    logger.error(
      'Invalid response format',
      new Error('Progress Reporting'),
      constructErrorResponseFromZod(result)
    );
  }
  return result.success;
};

export const isProgressReportingSchema = (
  value: unknown,
  withLogs: boolean = true
): value is TProgressReportingShape => {
  const isTimeframeOfInformation = isTimeframeOfInformationSchema(
    value,
    withLogs
  );
  const isAction = isActionSchema(value, withLogs);
  const isProgressOfTargets = isProgressOfTargetsSchema(value, withLogs);
  const isChallengesAndOpportunities = isChallengesAndOpportunitiesSchema(
    value,
    withLogs
  );

  return (
    isTimeframeOfInformation &&
    isAction &&
    isProgressOfTargets &&
    isChallengesAndOpportunities
  );
};

export const defaultProgressReportingFormValues: TProgressReportingShape = {
  ...defaultTimeframeOfInformationFormValues,
  ...defaultActionValues,
  ...defaultTProgressOfTargetsFormValues,
  ...defaultChallengesAndOpportunitiesFormValues
};

export type ProgressReportingDTO = {
  initiativeId?: string;
  id?: string;
  reportStatus: string | null;
  custom: string | null;
  reportingStartDate: string | null;
  reportingEndDate: string | null;
  submissionOrDraftDate?: string | null;
  typesOfChallengesFaced?: string[];
  othersTypesOfChallengesFaced?: string | null;
  descriptionOfChallenges?: string | null;
  descriptionOfOpportunitiesIdentified?: string | null;
  actions: {
    id?: string;
    title: string | null;
    description: string | null;
    type: string | null;
    typeOther?: string | null;
    impactExplanation: string | null;
    outcomes: string | null;
    outcomesUrl: string[];
    actionToTheMultilateralPro: string[];
    contributionOfTheAction: string | null;
    targets: string[];
  }[];
  targets: {
    id: string | null;
    targetId: string | null;
    baseYear: number | null;
    description: string | null;
    descriptionStatus: string | null;
    latestReportedYear: number | null;
    reportValue: number | null;
    status: string | null;
    title: string | null;
    types: string[] | null;
    unit: string | null;
    updateStatus: string | null;
    value: number | null;
    year: number | null;
  }[];
};

export type TProgressReportingShape = z.infer<typeof progressReportingShape> & {
  initiativeId?: string;
  reportStatus?: string;
};

export type TProgressReportingTableActions = 'VIEW' | 'EDIT' | 'DELETE';

export interface TProgressReportingData {
  id: string;
  timeframeOfInformation: string | null;
  draftLatestUpdate: string | null;
  reportingStatus: TagStatus;
  actions: TProgressReportingTableActions[];
}
