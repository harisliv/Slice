import { type InitiativeInformationFormData } from "@app/types";
import { InfoCard, TitleAction } from "@app/lib/ui";
import { NavLink } from "react-router";
import { Divider, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { INITIATIVE_INFORMATION_FIELD_INFO } from "@app/constants";
import { convertFileSize } from "@app/lib/general";

export default function GeneralInformationDisplayMode({
  initiativeProfile,
}: {
  initiativeProfile?: InitiativeInformationFormData;
}) {
  const {
    name,
    website,
    socialProfiles,
    logoBase64,
    launchDate,
    launchEvent,
    expectedEndDate,
    initiativeStatus,
    explanationStatus,
    summaryOutcomes,
    closureReport,
    contactEmail,
    contactOrganizations,
  } = initiativeProfile || {};

  return (
    <Stack direction="column" spacing={3}>
      <TitleAction
        title="General information"
        to="/course-profile/edit/initialStep/1/initialTab/0"
        RouterLink={NavLink}
      />
      <Grid container rowSpacing={3} columnSpacing={1}>
        <Grid size={{ sm: 4, xs: 12 }}>
          <InfoCard
            title={INITIATIVE_INFORMATION_FIELD_INFO.name.title}
            content={{ type: "text", value: name }}
          />
        </Grid>
        <Grid size={{ sm: 8, xs: 12 }}>
          <InfoCard
            title={INITIATIVE_INFORMATION_FIELD_INFO.website.title}
            content={{
              type: "url",
              value: website,
            }}
          />
        </Grid>
        <Grid size={{ sm: 12, xs: 12 }}>
          <InfoCard
            title={INITIATIVE_INFORMATION_FIELD_INFO.socialProfiles.title}
            content={{
              type: "social",
              value: socialProfiles,
            }}
          />
        </Grid>

        <Grid size={{ sm: 12, xs: 12 }}>
          <InfoCard
            title={INITIATIVE_INFORMATION_FIELD_INFO.logoBase64.title}
            content={{
              type: "image",
              src: logoBase64,
              alt: "Logo of the initiative",
            }}
          />
        </Grid>
        <Grid size={{ sm: 4, xs: 12, xxs: 12 }}>
          <InfoCard
            title={INITIATIVE_INFORMATION_FIELD_INFO.launchDate.title}
            content={{ type: "number", value: launchDate }}
          />
        </Grid>
        <Grid size={{ sm: 4, xs: 12, xxs: 12 }}>
          <InfoCard
            title={INITIATIVE_INFORMATION_FIELD_INFO.launchEvent.title}
            content={{
              type: "text",
              value: launchEvent ?? "",
            }}
          />
        </Grid>
        <Grid size={{ sm: 4, xs: 12, xxs: 12 }}>
          <InfoCard
            title={INITIATIVE_INFORMATION_FIELD_INFO.expectedEndDate.title}
            content={{ type: "number", value: expectedEndDate }}
          />
        </Grid>
      </Grid>
      <Divider />
      <TitleAction
        title="Status"
        to="/course-profile/edit/initialStep/1/initialTab/1"
        RouterLink={NavLink}
      />
      <Grid container rowSpacing={3} columnSpacing={1}>
        <Grid size={{ sm: 4, xs: 12 }}>
          <InfoCard
            title={INITIATIVE_INFORMATION_FIELD_INFO.initiativeStatus.title}
            content={{
              type: "text",
              value: initiativeStatus,
            }}
          />
        </Grid>
        {initiativeStatus?.toLowerCase() !== "active" && (
          <>
            <Grid size={{ sm: 8, xs: 12 }}>
              <InfoCard
                title={
                  INITIATIVE_INFORMATION_FIELD_INFO.explanationStatus.title
                }
                content={{
                  type: "text",
                  value: explanationStatus,
                }}
              />
            </Grid>
            <Grid size={{ sm: 12, xs: 12 }}>
              <InfoCard
                title={INITIATIVE_INFORMATION_FIELD_INFO.summaryOutcomes.title}
                content={{
                  type: "text",
                  value: summaryOutcomes,
                }}
              />
            </Grid>
            <Grid size={{ sm: 12, xs: 12 }}>
              <InfoCard
                title={INITIATIVE_INFORMATION_FIELD_INFO.closureReport.title}
                content={{
                  type: "doc",
                  value: {
                    filename: closureReport?.name ?? "",
                    url: closureReport?.url ?? "",
                    size: convertFileSize(closureReport?.size || 0),
                  },
                }}
              />
            </Grid>
          </>
        )}
      </Grid>
      <Divider />
      <TitleAction
        title="Contact information"
        to="/course-profile/edit/initialStep/1/initialTab/2"
        RouterLink={NavLink}
      />
      <Grid container rowSpacing={3} columnSpacing={1}>
        <Grid size={{ sm: 4, xs: 12 }}>
          <InfoCard
            title={INITIATIVE_INFORMATION_FIELD_INFO.contactEmail.title}
            content={{ type: "text", value: contactEmail }}
          />
        </Grid>
        <Grid size={{ sm: 8, xs: 12 }}>
          <InfoCard
            title={INITIATIVE_INFORMATION_FIELD_INFO.contactOrganizations.title}
            content={{
              type: "list",
              value: contactOrganizations?.map(
                (organization) => organization?.label || "",
              ),
            }}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
