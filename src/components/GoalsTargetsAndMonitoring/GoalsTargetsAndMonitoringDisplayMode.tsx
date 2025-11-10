import { type InitiativeProfileFormData } from '@app/types';
import { InfoCard, Paragraph, TitleAction } from '@app/lib/ui';
import { NavLink } from 'react-router';
import { Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import TargetDisplayItem from './Targets/components/TargetDisplayItem';
import { GOALS_TARGETS_MONITORING_FIELD_INFO } from '@app/constants';
import ClimateRelatedAlignmentTitle from './Goals/components/ClimateRelatedAlignmentTitle';
import { useDropdownValues } from '@app/hooks';
import {
  isStatusKey,
  mapPublicReportingOptions,
  mapStatus,
  statusOrder
} from '@app/utils/InitiativeProfile';

export default function GoalsTargetsAndMonitoringDisplayMode({
  initiativeProfile
}: {
  initiativeProfile?: InitiativeProfileFormData;
}) {
  const {
    targets,
    climateRelatedGoalImpactStatement,
    climateRelatedGoalDescription,
    climateRelatedGoalAlignmentParis,
    climateRelatedGoalAlignmentMultilateral,
    additionalValueInitiative,
    progress,
    publicReportingOptions,
    periodicalProgressReport,
    publicReportingOther
  } = initiativeProfile || {};

  const { mappedData } = useDropdownValues('Agreements');

  const mappedStatusTargets = targets
    ?.map((target) => {
      const newStatus = mapStatus(target);
      return { ...target, status: newStatus };
    })
    .sort((a, b) => {
      const A = isStatusKey(a.status)
        ? statusOrder[a.status]
        : statusOrder.undefinedStatus;
      const B = isStatusKey(b.status)
        ? statusOrder[b.status]
        : statusOrder.undefinedStatus;
      return A - B;
    });

  return (
    <Stack direction="column" spacing={3}>
      <TitleAction
        title="Goal"
        to="/course-profile/edit/initialStep/2/initialTab/0"
        RouterLink={NavLink}
      />
      <Grid container rowSpacing={3} columnSpacing={1}>
        <Grid size={{ sm: 12, xs: 12 }}>
          <InfoCard
            title={
              GOALS_TARGETS_MONITORING_FIELD_INFO.goalImpactStatement.title
            }
            content={{ type: 'text', value: climateRelatedGoalImpactStatement }}
          />
        </Grid>
        <Grid size={{ sm: 12, xs: 12 }}>
          <InfoCard
            title={GOALS_TARGETS_MONITORING_FIELD_INFO.goalDescription.title}
            content={{ type: 'text', value: climateRelatedGoalDescription }}
          />
        </Grid>
        <Grid size={{ sm: 12, xs: 12 }}>
          <InfoCard
            title={GOALS_TARGETS_MONITORING_FIELD_INFO.goalAlignement.title}
            content={{ type: 'text', value: climateRelatedGoalAlignmentParis }}
          />
        </Grid>
        {(climateRelatedGoalAlignmentMultilateral?.length ?? 0) > 0 && (
          <Grid size={{ sm: 12, xs: 12 }}>
            <Stack spacing={2}>
              <InfoCard
                title={
                  GOALS_TARGETS_MONITORING_FIELD_INFO.goalAlignementWithOther
                    .title
                }
              />
              {climateRelatedGoalAlignmentMultilateral?.map((item, index) => (
                <ClimateRelatedAlignmentTitle
                  key={item.agreement ?? String(index)}
                  title={mappedData[item.agreement ?? '']}
                  text={item.description ?? ''}
                  isEditMode={false}
                />
              ))}
            </Stack>
          </Grid>
        )}
        {additionalValueInitiative && (
          <Grid size={{ sm: 12, xs: 12 }}>
            <InfoCard
              title={GOALS_TARGETS_MONITORING_FIELD_INFO.additionalValue.title}
              content={{ type: 'text', value: additionalValueInitiative }}
            />
          </Grid>
        )}
      </Grid>
      <Divider />
      <TitleAction
        title="Targets"
        buttonTitle="Create new target"
        to="/course-profile/edit/initialStep/2/initialTab/1"
        RouterLink={NavLink}
      />
      <Grid container rowSpacing={3} columnSpacing={1}>
        {mappedStatusTargets?.length ? (
          mappedStatusTargets?.map((mappedStatusTarget) => (
            <TargetDisplayItem
              key={mappedStatusTarget.id}
              target={mappedStatusTarget}
            />
          ))
        ) : (
          <Paragraph variant="medium-regular">-</Paragraph>
        )}
      </Grid>
      <Divider />
      <TitleAction
        title="Monitoring arrangements section"
        to="/course-profile/edit/initialStep/2/initialTab/2"
        RouterLink={NavLink}
      />
      <Grid size={{ sm: 4, xs: 12 }}>
        <InfoCard
          title={GOALS_TARGETS_MONITORING_FIELD_INFO.monitoringProgress.title}
          content={{ type: 'text', value: progress }}
        />
      </Grid>
      <Grid size={{ sm: 4, xs: 12 }}>
        <InfoCard
          title={
            GOALS_TARGETS_MONITORING_FIELD_INFO.typesOfPublicReporting.title
          }
          content={{
            type: 'list',
            showDot: false,
            value: [
              ...mapPublicReportingOptions(
                publicReportingOptions || {
                  checkbox1: false,
                  checkbox2: false,
                  checkbox3: false
                }
              ),
              ...(publicReportingOther && publicReportingOther.trim().length > 0
                ? [publicReportingOther]
                : [])
            ]
          }}
        />
      </Grid>
      <Grid size={{ sm: 12, xs: 12 }}>
        <InfoCard
          title={
            GOALS_TARGETS_MONITORING_FIELD_INFO
              .previouslySubmittedProgressReports.title
          }
          content={{
            type: 'docMultiple',
            value: periodicalProgressReport?.map((rep) => ({
              filename: rep.title || '',
              url: rep.report?.url || '',
              size: rep.report?.size || 0
            }))
          }}
        />
      </Grid>
    </Stack>
  );
}
