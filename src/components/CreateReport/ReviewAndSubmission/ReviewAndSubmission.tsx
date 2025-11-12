import Report from '../Report';
import type { TProgressReportingShape } from '@app/types';

interface ReviewAndSubmissionProps {
  data: TProgressReportingShape;
}

export default function ReviewAndSubmission({
  data
}: ReviewAndSubmissionProps) {
  return <Report data={data} />;
}
