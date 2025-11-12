import {
  AppCard,
  CustomTag,
  Header3,
  Paragraph,
  Select,
  SkeletonComponent
} from '@app/lib/ui';
import { AppCardWrapper, InitiativeCardsContainer } from './Initiative.styles';
import { DianaIcon, FileTextIcon, UserIcon } from '@app/lib/icons';
import { Box, Grid2, Stack } from '@mui/material';
import {
  useActiveInitiative,
  useGlobalLoading,
  useInitiatives
} from '@app/hooks';
import { NavLink } from 'react-router';
import { formatAndSplitDateTime } from '@app/utils';

export default function Initiative() {
  const { data: initiatives } = useInitiatives();
  const { activeInitiative, setActiveInitiative } = useActiveInitiative();
  const isLoading = useGlobalLoading();

  const { date: lastUpdatedDate, hour: lastUpdatedHour } =
    formatAndSplitDateTime(activeInitiative?.lastUpdated);
  const { date: lastProgressSubmittedDate, hour: lastProgressSubmittedHour } =
    formatAndSplitDateTime(activeInitiative?.lastProgressSubmitted);
  const { date: lastParticipantUpdatedDate, hour: lastParticipantUpdatedHour } =
    formatAndSplitDateTime(activeInitiative?.lastParticipantUpdated);

  return (
    <>
      {isLoading ? (
        <SkeletonComponent />
      ) : (
        <>
          {initiatives?.length && initiatives.length > 1 && (
            <Grid2 container>
              <Grid2 size={6}>
                <Select
                  fullWidth
                  label="Course"
                  name="course"
                  required
                  options={initiatives?.map((initiative) => ({
                    label: initiative.name,
                    value: initiative.id
                  }))}
                  defaultValue={activeInitiative?.id}
                  placeholder="Select a Course"
                  onSelectChange={(option) => {
                    const initiative = initiatives?.find(
                      (initiative) => initiative.id === option.value
                    );
                    localStorage.setItem('initiativeId', initiative?.id ?? '');
                    setActiveInitiative(initiative);
                  }}
                  inputProps={{ 'aria-label': 'Select Course' }}
                  noOptionsFallbackTitle="No courses found"
                  noOptionsFallbackSubtitle="Please select a different entity or create a new course."
                />
              </Grid2>
            </Grid2>
          )}
          <Stack spacing={1}>
            <Stack direction="row" spacing={2}>
              <Header3>
                Course:{' '}
                <span style={{ fontWeight: 700 }}>
                  {activeInitiative?.name}
                </span>
              </Header3>
              <CustomTag variant={activeInitiative?.initiativeStatus} />
            </Stack>
            <Box>
              <Paragraph variant="medium-regular">
                {'Profile updated:'}{' '}
                <span style={{ fontWeight: 700 }}>
                  {lastUpdatedDate} | {lastUpdatedHour}
                </span>
              </Paragraph>
              <Paragraph variant="medium-regular">
                {'Assignment submitted:'}{' '}
                <span style={{ fontWeight: 700 }}>
                  {lastProgressSubmittedDate} | {lastProgressSubmittedHour}
                </span>
              </Paragraph>

              <Paragraph variant="medium-regular">
                {'Students information updated:'}{' '}
                <span style={{ fontWeight: 700 }}>
                  {lastParticipantUpdatedDate} | {lastParticipantUpdatedHour}
                </span>
              </Paragraph>
            </Box>
          </Stack>
          <InitiativeCardsContainer>
            <AppCardWrapper>
              <AppCard
                icon={<FileTextIcon />}
                cardTitle={'Course profile'}
                cardSubtitle={
                  'Provide or update profile information about the course'
                }
                LinkComponent={NavLink}
                to={'/course-profile'}
              />
            </AppCardWrapper>
            <AppCardWrapper>
              <AppCard
                icon={<DianaIcon />}
                cardTitle={'Assignment management'}
                cardSubtitle={
                  'Manage assignments and track student submissions'
                }
                LinkComponent={NavLink}
                to={'/assignment-management'}
              />
            </AppCardWrapper>
            <AppCardWrapper>
              <AppCard
                icon={<UserIcon />}
                cardTitle={'Student management'}
                cardSubtitle={
                  'Manage students, export lists, and handle enrollments and applications.'
                }
                LinkComponent={NavLink}
                to={'/student-management'}
              />
            </AppCardWrapper>
          </InitiativeCardsContainer>
        </>
      )}
    </>
  );
}
