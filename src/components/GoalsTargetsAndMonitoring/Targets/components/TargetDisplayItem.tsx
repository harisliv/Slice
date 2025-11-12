import Grid from '@mui/material/Grid2';
import { CustomAccordion, Paragraph } from '@app/lib/ui';
import { type TargetFormData } from '@app/types';
import {
  StyledHeader2Cell,
  StyledTable2Header,
  StyledTable2Row,
  TableComponent
} from '@app/lib/ui';
import { Box, TableCell } from '@mui/material';
import { renderValueOrHyphen } from '@app/utils';

interface TargetDisplayItemProps {
  target: TargetFormData['targets'][0];
  onActionClick?: (event?: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  showSecondTable?: boolean;
  isEditMode?: boolean;
}

export default function TargetDisplayItem({
  target,
  onActionClick = () => {},
  showSecondTable = true,
  isEditMode = false
}: TargetDisplayItemProps) {
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
        target.baseyear,
        target.type.join(', '),
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
    <StyledTable2Row key={`rows-${target.id}-2`}>
      {[
        target?.targetProgress[0]?.latestReportedYear,
        target?.targetProgress[0]?.updateStatus,
        target?.targetProgress[0]?.descriptionStatus,
        target?.targetProgress[0]?.reportValue
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
        defaultExpanded={isEditMode}
        title={target.title || ''}
        onActionClick={() => onActionClick()}
        tagStatus={!isEditMode ? target.status : null}
        withDelete={isEditMode}
      >
        <Box display={'flex'} gap={2} flexDirection={'column'}>
          <Box display={'flex'} gap={1} flexDirection={'column'}>
            {!isEditMode && (
              <Paragraph variant="medium-bold">Target description</Paragraph>
            )}
            <Paragraph variant="medium-regular">{target.description}</Paragraph>
          </Box>
          <TableComponent headerGroups={[headerGroups]} rows={[rows]} />
          {showSecondTable && (
            <TableComponent headerGroups={[headerGroups2]} rows={[rows2]} />
          )}
        </Box>
      </CustomAccordion>
    </Grid>
  );
}
