import { CREATE_REPORT_FIELD_INFO } from '@app/constants';
import type { TProgressReportingShape } from '@app/types';
import { Divider, Grid2 } from '@mui/material';
import { Stack } from '@mui/system';
import { Header3, Header4, InfoCard, Paragraph } from '@app/lib/ui';
import Link from '@mui/material/Link';

interface ActionsOutcomesImpactsReviewProps {
  data: TProgressReportingShape;
}
export default function ActionsOutcomesImpactsReview({
  data
}: ActionsOutcomesImpactsReviewProps) {
  const actions = data?.actions?.length ? data.actions : null;

  return (
    <Stack direction="column" spacing={4}>
      <Header3 variant="bold">2. Actions, outcomes, impacts</Header3>
      {actions ? (
        actions.map((action, index) => (
          <Grid2 container key={action.id} direction={'column'} spacing={3}>
            <Header4 variant="lora">{`Action ${index + 1}`}</Header4>
            <Grid2 container spacing={3}>
              <Grid2 size={{ sm: 6, xs: 12, xxs: 12 }}>
                <InfoCard
                  title={CREATE_REPORT_FIELD_INFO.action.title.title}
                  content={{
                    type: 'text',
                    value: action.title
                  }}
                />
              </Grid2>
              <Grid2 size={{ sm: 6, xs: 12, xxs: 12 }}>
                <InfoCard
                  title={CREATE_REPORT_FIELD_INFO.action.typeOfAction.title}
                  content={{
                    type: 'text',
                    value: action.typeOfAction
                  }}
                />
              </Grid2>
              {action.typeOther && (
                <Grid2 size={{ sm: 12, xs: 12, xxs: 12 }}>
                  <InfoCard
                    title="Type of action undertaken - other"
                    content={{
                      type: 'text',
                      value: action.typeOther
                    }}
                  />
                </Grid2>
              )}
              <Grid2 size={{ sm: 12, xs: 12, xxs: 12 }}>
                <InfoCard
                  title={CREATE_REPORT_FIELD_INFO.action.description.title}
                  content={{
                    type: 'text',
                    value: action.description
                  }}
                />
              </Grid2>
              {action?.associatedTargets?.length ? (
                <Grid2 size={{ sm: 12, xs: 12, xxs: 12 }}>
                  <InfoCard
                    title={
                      CREATE_REPORT_FIELD_INFO.action.associatedTargets.title
                    }
                    content={{
                      type: 'list',
                      value: action.associatedTargets
                    }}
                  />
                </Grid2>
              ) : null}
              <Grid2 size={{ sm: 12, xs: 12, xxs: 12 }}>
                <InfoCard
                  title={CREATE_REPORT_FIELD_INFO.action.outcomes.title}
                  content={{
                    type: 'text',
                    value: action.outcomes
                  }}
                />
                {action.outcomesUrl.length > 0 && (
                  <ul>
                    {action.outcomesUrl.map(
                      (url) =>
                        url !== '' && (
                          <li>
                            <Link
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {url}
                            </Link>
                          </li>
                        )
                    )}
                  </ul>
                )}
              </Grid2>
              <Grid2 size={{ sm: 12, xs: 12, xxs: 12 }}>
                <InfoCard
                  title={
                    CREATE_REPORT_FIELD_INFO.action.impactExplanation.title
                  }
                  content={{
                    type: 'text',
                    value: action.impactExplanation
                  }}
                />
              </Grid2>
              {action.contributionToMultilateralProcess?.length > 0 && (
                <>
                  <Grid2 size={{ sm: 12, xs: 12, xxs: 12 }}>
                    <InfoCard
                      title={
                        CREATE_REPORT_FIELD_INFO.action
                          .contributionToMultilateralProcess.title
                      }
                      content={{
                        type: 'list',
                        value: action.contributionToMultilateralProcess
                      }}
                    />
                  </Grid2>
                  <Grid2 size={{ sm: 12, xs: 12, xxs: 12 }}>
                    <InfoCard
                      title={
                        CREATE_REPORT_FIELD_INFO.action
                          .contributionToMultilateralProcessDescription.title
                      }
                      content={{
                        type: 'text',
                        value: action.contributionOfTheAction
                      }}
                    />
                  </Grid2>
                </>
              )}
            </Grid2>
            {index !== actions.length - 1 && <Divider />}
          </Grid2>
        ))
      ) : (
        <Paragraph>-</Paragraph>
      )}
    </Stack>
  );
}
