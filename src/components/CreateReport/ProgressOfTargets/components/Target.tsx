import Grid from '@mui/material/Grid2';
import {
  CustomAccordion,
  Paragraph,
  Table2Component,
  Tooltip
} from '@app/lib/ui';
import {
  isProgressOfTargetsSchema,
  type ProgressOfTargetsFormData
} from '@app/types';
import {
  StyledHeader2Cell,
  StyledTable2Header,
  StyledTable2Row
} from '@app/lib/ui';
import { Box, TableCell } from '@mui/material';
import { PendingIcon, ProvidedIcon } from '@app/lib/icons';
import ControlledInput, {
  ControlledSelectWithDropdown,
  NumericControlledInput
} from '@app/components/ControlledInput';
import { PROGRESS_OF_TARGETS_FIELD_INFO } from '@app/constants';
import { useFormContext } from 'react-hook-form';
import { renderValueOrHyphen } from '@app/utils';
import { TagStatus } from '@app/lib/types';

interface TargetDisplayItemProps {
  target: ProgressOfTargetsFormData['targets'][0];
  index: number;
  onActionClick?: (event?: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

export default function Target({
  target,
  index,
  onActionClick = () => {}
}: TargetDisplayItemProps) {
  const { watch } = useFormContext<ProgressOfTargetsFormData>();
  const currentTarget = watch(`targets.${index}`);
  const currentTargetValue = currentTarget.value;

  const isValid = isProgressOfTargetsSchema(
    { targets: [currentTarget] },
    false
  );

  const getColumns = () => [
    'Target year',
    'Target base year',
    'Target type',
    'Target unit',
    'Target value'
  ];
  const getColumns2 = () => [
    'Latest Reported Year',
    'Latest target overall status',
    'Latest progress description',
    'Current value'
  ];

  const headerGroups = (
    <StyledTable2Header key={`headerGroups-${target.id}-1`}>
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

  const rows = (
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

  const headerGroups2 = (
    <StyledTable2Header key={`headerGroups-${target.id}-2`}>
      {getColumns2().map((headerGroup, index) => (
        <StyledHeader2Cell
          key={`${headerGroup}-${index}`}
          colSpan={1}
          style={{ width: index === 2 ? '40%' : '20%' }}
        >
          {headerGroup}
        </StyledHeader2Cell>
      ))}
    </StyledTable2Header>
  );

  const rows2 = (
    <StyledTable2Row>
      {[
        target?.latestReportedYear || '-',
        target?.updateStatus || '-',
        target?.descriptionStatus || '-',
        target?.reportValue || '-'
      ].map((value, index) => (
        <TableCell
          key={`${value}-${index}`}
          colSpan={1}
          style={{ width: index === 2 ? '40%' : '20%' }}
        >
          {renderValueOrHyphen(value)}
        </TableCell>
      ))}
    </StyledTable2Row>
  );

  return (
    <Grid size={{ sm: 12, xs: 12 }}>
      <CustomAccordion
        title={target.title || ''}
        onActionClick={() => onActionClick()}
        tagStatus={TagStatus.ACTIVE}
        panelContent={
          <>
            {isValid && (
              <Tooltip title="Target updates provided">
                <span>
                  <ProvidedIcon />
                </span>
              </Tooltip>
            )}
            {!isValid && (
              <Tooltip title="Target updates pending">
                <span>
                  <PendingIcon />
                </span>
              </Tooltip>
            )}
          </>
        }
      >
        <Box display={'flex'} gap={2} flexDirection={'column'}>
          <Box display={'flex'} gap={1} flexDirection={'column'}>
            <Paragraph variant="medium-bold">Target description</Paragraph>
            <Paragraph variant="medium-regular">{target.description}</Paragraph>
          </Box>
          <Table2Component headerGroups={[headerGroups]} rows={[rows]} />
          <Table2Component headerGroups={[headerGroups2]} rows={[rows2]} />
          <Grid container columnSpacing={1} rowSpacing={3}>
            <Grid size={{ sm: 6, xs: 12, xxs: 12 }}>
              <NumericControlledInput
                disabled={!currentTargetValue && currentTargetValue !== 0}
                name={`targets.${index}.reportValue`}
                required
                inputDescriptionTitle={
                  PROGRESS_OF_TARGETS_FIELD_INFO.reportValue.title
                }
              />
            </Grid>
            <Grid size={{ sm: 6, xs: 12, xxs: 12 }}>
              <ControlledSelectWithDropdown
                required
                name={`targets.${index}.updateStatus`}
                inputDescriptionTitle={
                  PROGRESS_OF_TARGETS_FIELD_INFO.updateStatus.title
                }
                dropdownEnpoint="TargetProgressTypes"
              />
            </Grid>
            <Grid size={{ sm: 12, xs: 12, xxs: 12 }}>
              <ControlledInput
                name={`targets.${index}.descriptionStatus`}
                required
                inputDescriptionTitle={
                  PROGRESS_OF_TARGETS_FIELD_INFO.descriptionOfStatus.title
                }
                istextArea
                helperText={
                  PROGRESS_OF_TARGETS_FIELD_INFO.descriptionOfStatus.helper
                }
              />
            </Grid>
          </Grid>
        </Box>
      </CustomAccordion>
    </Grid>
  );
}
