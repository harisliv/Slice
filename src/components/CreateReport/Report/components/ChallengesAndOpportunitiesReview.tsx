import { CHALLENGES_FIELD_INFO } from "@app/constants";
import type { TProgressReportingShape } from "@app/types";
import { Grid2 } from "@mui/material";
import { Stack } from "@mui/system";
import { Header3, InfoCard } from "@app/lib/ui";
interface ChallengesAndOpportunitiesReviewProps {
  data: TProgressReportingShape;
}
export default function ChallengesAndOpportunitiesReview({
  data,
}: ChallengesAndOpportunitiesReviewProps) {
  return (
    <Stack direction="column" spacing={4}>
      <Header3 variant="bold">4. Challenges and opportunities</Header3>
      <Grid2 container spacing={3}>
        <Grid2 size={{ sm: 12, xs: 12, xxs: 12 }}>
          <InfoCard
            title={CHALLENGES_FIELD_INFO.typesOfChallenges.title}
            content={{
              type: "list",
              value: data?.typesOfChallengesFaced?.map(
                (challenge) => challenge || "-",
              ),
            }}
          />
        </Grid2>
        {data?.othersTypesOfChallengesFaced && (
          <Grid2 size={{ sm: 12, xs: 12, xxs: 12 }}>
            <InfoCard
              title={CHALLENGES_FIELD_INFO.typesOfChallengesOther.title}
              content={{
                type: "text",
                value: data?.othersTypesOfChallengesFaced,
              }}
            />
          </Grid2>
        )}
        {data?.descriptionOfChallenges && (
          <Grid2 size={{ sm: 12, xs: 12, xxs: 12 }}>
            <InfoCard
              title={CHALLENGES_FIELD_INFO.descriptionOfChallenges.title}
              content={{
                type: "text",
                value: data?.descriptionOfChallenges,
              }}
            />
          </Grid2>
        )}
        {data?.descriptionOfOpportunitiesIdentified && (
          <Grid2 size={{ sm: 12, xs: 12, xxs: 12 }}>
            <InfoCard
              title={CHALLENGES_FIELD_INFO.descriptionOfOpportunities.title}
              content={{
                type: "text",
                value: data?.descriptionOfOpportunitiesIdentified,
              }}
            />
          </Grid2>
        )}
      </Grid2>
    </Stack>
  );
}
