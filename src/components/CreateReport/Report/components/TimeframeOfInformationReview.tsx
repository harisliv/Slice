import { CREATE_REPORT_FIELD_INFO } from "@app/constants";
import type { TProgressReportingShape } from "@app/types";
import { formatDate } from "@app/utils";
import { Grid2 } from "@mui/material";
import { Stack } from "@mui/system";
import { Header3, InfoCard } from "@app/lib/ui";
import dayjs from "dayjs";

interface TimeframeOfInformationReviewProps {
  data: TProgressReportingShape;
}

export default function TimeframeOfInformationReview({
  data,
}: TimeframeOfInformationReviewProps) {
  return (
    <Stack direction="column" spacing={4}>
      <Header3 variant="bold">1. Timeframe of information</Header3>
      <Grid2 container direction={"column"} spacing={3}>
        <Grid2 size={{ sm: 6, xs: 12, xxs: 12 }}>
          <InfoCard
            title={CREATE_REPORT_FIELD_INFO.typeTimeframeOfInformation.title}
            content={{
              type: "text",
              value: data?.timeframeOfInformation,
            }}
          />
        </Grid2>
        {data?.startDate && (
          <Stack direction={"row"}>
            <Grid2 size={{ sm: 6, xs: 12, xxs: 12 }}>
              <InfoCard
                title={CREATE_REPORT_FIELD_INFO.startDate.title}
                content={{
                  type: "text",
                  value: formatDate(data?.startDate),
                }}
              />
            </Grid2>
            <Grid2 size={{ sm: 6, xs: 12, xxs: 12 }}>
              <InfoCard
                title={CREATE_REPORT_FIELD_INFO.endDate.title}
                content={{
                  type: "text",
                  value: dayjs(data?.startDate)
                    .add(1, "year")
                    .subtract(1, "day")
                    .format("DD-MM-YYYY"),
                }}
              />
            </Grid2>
          </Stack>
        )}
      </Grid2>
    </Stack>
  );
}
