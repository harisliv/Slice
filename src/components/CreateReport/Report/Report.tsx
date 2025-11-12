import { Stack, Divider } from '@mui/material';
import TimeframeOfInformationReview from './components/TimeframeOfInformationReview';
import ActionsOutcomesImpactsReview from './components/ActionsOutcomesImpactsReview';
import ProgressOfTargetsReview from './components/ProgressOfTargetsReview';
import ChallengesAndOpportunitiesReview from './components/ChallengesAndOpportunitiesReview';
import type { TProgressReportingShape } from '@app/types';

interface ReportProps {
  data: TProgressReportingShape;
}

const Report = ({ data }: ReportProps) => (
  <Stack spacing={4}>
    <div>
      <TimeframeOfInformationReview data={data} />
    </div>
    <Divider />
    <div>
      <ActionsOutcomesImpactsReview data={data} />
    </div>
    <Divider />
    <div>
      <ProgressOfTargetsReview data={data} />
    </div>
    <Divider />
    <div>
      <ChallengesAndOpportunitiesReview data={data} />
    </div>
  </Stack>
);

export default Report;
