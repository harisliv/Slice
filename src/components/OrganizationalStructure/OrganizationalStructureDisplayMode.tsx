import { type InitiativeProfileFormData } from '@app/types';
import { InfoCard, Paragraph, TitleAction } from '@app/lib/ui';
import { NavLink } from 'react-router';
import { Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { ORGANIZATIONAL_STRUCTURE_FIELD_INFO } from '@app/constants';
import {
  useLeadOrganizationsDisplayModeColumns,
  usePendingInitiativesDisplayModeColumns,
  useRelatedInitiativesDisplayModeColumns
} from './hooks';
import { GenericTable } from '@app/components';
import {
  filterManualRelatedInitiatives,
  filterRelationshipRelatedInitiatives
} from '@app/utils/InitiativeProfile';

export default function OrganizationalStructureDisplayMode({
  initiativeProfile
}: {
  initiativeProfile?: InitiativeProfileFormData;
}) {
  const {
    organizationalArrangements,
    dedicatedStaff,
    staffingInformation,
    leadOrganizations,
    relatedInitiatives,
    signatoriesMembers,
    signatoryCriteria,
    signatoryFollowUps,
    signatoryFollowUpsOther,
    signatoryRemoval,
    memberInformation
  } = initiativeProfile || {};

  const signatories =
    signatoriesMembers && signatoriesMembers.includes('Enrolled Students');
  const members =
    signatoriesMembers && signatoriesMembers.includes('Registered Students');

  const leadOrgcolumns = useLeadOrganizationsDisplayModeColumns();

  const manualRelatedInitiatives =
    filterManualRelatedInitiatives(relatedInitiatives);

  const relationshipRelatedInitiatives =
    filterRelationshipRelatedInitiatives(relatedInitiatives);

  const relatedInitiativescolumns = useRelatedInitiativesDisplayModeColumns();

  const pendingInitiativescolumns = usePendingInitiativesDisplayModeColumns();

  return (
    <Stack direction="column" spacing={3}>
      <TitleAction
        title="Organizational arrangements"
        to="/course-profile/edit/initialStep/3/initialTab/0"
        RouterLink={NavLink}
      />
      <Grid container rowSpacing={3} columnSpacing={1}>
        <Grid size={{ sm: 12, xs: 12 }}>
          <InfoCard
            title={
              ORGANIZATIONAL_STRUCTURE_FIELD_INFO.organizationalArrangements
                .title
            }
            content={{ type: 'text', value: organizationalArrangements }}
          />
        </Grid>
        <Grid size={{ sm: 12, xs: 12 }}>
          <InfoCard
            title={ORGANIZATIONAL_STRUCTURE_FIELD_INFO.dedicatedStaff.title}
            content={{ type: 'text', value: dedicatedStaff }}
          />
        </Grid>
        <Grid size={{ sm: 12, xs: 12 }}>
          <InfoCard
            title={
              ORGANIZATIONAL_STRUCTURE_FIELD_INFO.staffingInformation.title
            }
            content={{ type: 'text', value: staffingInformation }}
          />
        </Grid>
      </Grid>
      <Divider />
      <TitleAction
        title="Involved entities"
        buttonTitle="Edit"
        to="/course-profile/edit/initialStep/3/initialTab/1"
        RouterLink={NavLink}
      />
      <Paragraph variant="medium-bold">
        {ORGANIZATIONAL_STRUCTURE_FIELD_INFO.leadOrganizations.title}
      </Paragraph>
      <Grid container rowSpacing={3} columnSpacing={1}>
        {!leadOrganizations?.length ? (
          <div style={{ marginTop: '0' }}>-</div>
        ) : (
          <GenericTable
            columns={leadOrgcolumns}
            data={leadOrganizations ?? []}
          />
        )}

        <Grid size={{ sm: 12, xs: 12 }}>
          <InfoCard
            title={ORGANIZATIONAL_STRUCTURE_FIELD_INFO.participants.title}
            content={{
              type: 'text',
              value: ORGANIZATIONAL_STRUCTURE_FIELD_INFO.participants.subtitle
            }}
          />
        </Grid>
        <Grid size={{ sm: 12, xs: 12 }}>
          <Stack spacing={2.5}>
            {signatories && (
              <Stack spacing={1.5}>
                <Paragraph variant="medium-bold">
                  Enrolled student information
                </Paragraph>

                {signatories && (
                  <Paragraph variant="medium-regular">
                    <b>
                      {
                        ORGANIZATIONAL_STRUCTURE_FIELD_INFO.signatoryCriteria
                          .title
                      }
                      :{' '}
                    </b>
                    {signatoryCriteria}
                  </Paragraph>
                )}
                {signatories && (
                  <Paragraph variant="medium-regular">
                    <b>
                      {
                        ORGANIZATIONAL_STRUCTURE_FIELD_INFO.signatoryFollowUps
                          .title
                      }
                      :{' '}
                    </b>
                    {signatoryFollowUps}
                  </Paragraph>
                )}
                {!!signatoryFollowUpsOther && (
                  <Paragraph variant="medium-regular">
                    <b>
                      {
                        ORGANIZATIONAL_STRUCTURE_FIELD_INFO
                          .signatoryFollowUpsOther.title
                      }
                      :{' '}
                    </b>
                    {signatoryFollowUpsOther}
                  </Paragraph>
                )}
                {signatories && (
                  <Paragraph variant="medium-regular">
                    <b>
                      {
                        ORGANIZATIONAL_STRUCTURE_FIELD_INFO.signatoryRemoval
                          .title
                      }
                      :{' '}
                    </b>
                    {signatoryRemoval}
                  </Paragraph>
                )}
              </Stack>
            )}
            {members && (
              <Stack spacing={1.5}>
                <Paragraph variant="medium-bold">
                  {ORGANIZATIONAL_STRUCTURE_FIELD_INFO.memberInformation.title}
                </Paragraph>

                <Paragraph variant="medium-regular">
                  {memberInformation}
                </Paragraph>
              </Stack>
            )}
          </Stack>
        </Grid>
      </Grid>

      <Divider />
      <TitleAction
        title="Related Initiatives"
        to="/course-profile/edit/initialStep/3/initialTab/2"
        RouterLink={NavLink}
      />
      <Grid container rowSpacing={3} columnSpacing={1}>
        <Grid size={{ sm: 12, xs: 12 }}>
          <Stack spacing={3}>
            <Paragraph variant="large-bold">
              {ORGANIZATIONAL_STRUCTURE_FIELD_INFO.relatedInitiatives.title}
            </Paragraph>
            {!manualRelatedInitiatives?.length ? (
              <div style={{ marginTop: '0' }}>-</div>
            ) : (
              <GenericTable
                columns={relatedInitiativescolumns}
                data={manualRelatedInitiatives}
              />
            )}

            <Paragraph variant="large-bold">
              {
                ORGANIZATIONAL_STRUCTURE_FIELD_INFO.relatedInitiativesPending
                  .title
              }
            </Paragraph>
            {!relationshipRelatedInitiatives?.length ? (
              <div style={{ marginTop: '0' }}>-</div>
            ) : (
              <GenericTable
                columns={pendingInitiativescolumns}
                data={relationshipRelatedInitiatives}
              />
            )}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
