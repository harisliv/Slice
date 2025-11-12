import {
  PROGRESS_OF_TARGETS_FIELD_INFO,
  REVIEW_FIELD_INFO
} from '@app/constants';
import type { TProgressReportingShape } from '@app/types';
import { renderValueOrHyphen } from '@app/utils';
import { Divider, Grid2, TableCell } from '@mui/material';
import { Stack } from '@mui/system';
import type { ProgressOfTargetsFormData } from '@app/types';
import {
  Header3,
  Header4,
  InfoCard,
  Paragraph,
  StyledHeader2Cell,
  StyledTable2Header,
  StyledTable2Row,
  Table2Component
} from '@app/lib/ui';

interface ProgressOfTargetsReviewProps {
  data: TProgressReportingShape;
}
export default function ProgressOfTargetsReview({
  data
}: ProgressOfTargetsReviewProps) {
  const targets = data?.targets?.length ? data.targets : null;
  const getColumns = () => [
    'Target year',
    'Target base year',
    'Target type',
    'Target unit',
    'Target value'
  ];
  const headerGroups = (id: string) => (
    <StyledTable2Header key={`headerGroups-${id}-1`}>
      {getColumns().map((headerGroup, index) => (
        <StyledHeader2Cell
          key={`${headerGroup}-${index}`}
          colSpan={1}
          style={{ width: '20%' }}
        >
          {headerGroup}
        </StyledHeader2Cell>
      ))}
    </StyledTable2Header>
  );
  const rows = (target: ProgressOfTargetsFormData['targets'][0]) => (
    <StyledTable2Row key={`rows-${target.id}-1`}>
      {[
        target.year,
        target.baseYear,
        target.types?.join(', '),
        target.unit,
        target.value
      ].map((value, index) => (
        <TableCell
          key={`${value}-${index}`}
          colSpan={1}
          style={{ width: '20%' }}
        >
          {renderValueOrHyphen(value)}
        </TableCell>
      ))}
    </StyledTable2Row>
  );

  return (
    <Stack direction="column" spacing={4}>
      <Header3 variant="bold">3. Progress of targets</Header3>
      {targets ? (
        targets.map((target, index) => (
          <Grid2 container key={target.id} direction={'column'} spacing={3}>
            <Header4 variant="lora">{`Target ${index + 1}`}</Header4>
            <Grid2 container spacing={3}>
              <Grid2 size={{ sm: 12, xs: 12, xxs: 12 }}>
                <InfoCard
                  title={REVIEW_FIELD_INFO.targetDescription.title}
                  content={{
                    type: 'text',
                    value: target.description
                  }}
                />
              </Grid2>

              <Table2Component
                headerGroups={[headerGroups(target.id || '')]}
                rows={[rows(target)]}
              />

              <Grid2 size={{ sm: 6, xs: 12, xxs: 12 }}>
                <InfoCard
                  title={REVIEW_FIELD_INFO.targetReportedValue.title}
                  content={{
                    type: 'text',
                    value: !isNaN(target.reportValue)
                      ? target.reportValue.toString()
                      : '-'
                  }}
                />
              </Grid2>

              <Grid2 size={{ sm: 6, xs: 12, xxs: 12 }}>
                <InfoCard
                  title={
                    PROGRESS_OF_TARGETS_FIELD_INFO.descriptionOfStatus.title
                  }
                  content={{
                    type: 'text',
                    value: target.descriptionStatus
                  }}
                />
              </Grid2>
              <Grid2 size={{ sm: 6, xs: 12, xxs: 12 }}>
                <InfoCard
                  title={REVIEW_FIELD_INFO.targetUpdatedStatus.title}
                  content={{
                    type: 'text',
                    value: target.updateStatus
                  }}
                />
              </Grid2>
            </Grid2>
            {index !== targets.length - 1 && <Divider />}
          </Grid2>
        ))
      ) : (
        <Paragraph>-</Paragraph>
      )}
    </Stack>
  );
}
