import { Divider, Grid2 } from "@mui/material";
import { CHALLENGES_FIELD_INFO } from "@app/constants";
import ControlledInput from "@app/components/ControlledInput";
import { useFormContext } from "react-hook-form";
import type { ChallengesAndOpportunitiesFormData } from "@app/types";
import { ControlledMultiSelectWithDropdown } from "@app/components/ControlledInput";

export default function ChallengesAndOpportunities() {
  const { watch, setValue } =
    useFormContext<ChallengesAndOpportunitiesFormData>();
  const typesOfChallengesFaced = watch("typesOfChallengesFaced") || [];

  return (
    <Grid2 container direction={"column"} spacing={4}>
      <Grid2 size={{ sm: 6, xs: 12, xxs: 12 }}>
        <ControlledMultiSelectWithDropdown
          required
          name="typesOfChallengesFaced"
          inputDescriptionTitle={CHALLENGES_FIELD_INFO.typesOfChallenges.title}
          inputDescriptionSubtitle={
            CHALLENGES_FIELD_INFO.typesOfChallenges.subtitle
          }
          dropdownEnpoint="TypesOfChallengesFaced"
          maxOptions={2}
          onApplyCapture={() => {
            setValue("othersTypesOfChallengesFaced", null);
          }}
        />
      </Grid2>
      {typesOfChallengesFaced.includes("Other") && (
        <Grid2 size={{ sm: 12, xs: 12, xxs: 12 }}>
          <ControlledInput
            istextArea
            required
            name="othersTypesOfChallengesFaced"
            inputDescriptionTitle={
              CHALLENGES_FIELD_INFO.typesOfChallengesOther.title
            }
            inputDescriptionSubtitle={
              CHALLENGES_FIELD_INFO.typesOfChallengesOther.subtitle
            }
            helperText={CHALLENGES_FIELD_INFO.typesOfChallengesOther.helper}
          />
        </Grid2>
      )}
      <Divider />
      <Grid2 size={{ sm: 12, xs: 12, xxs: 12 }}>
        <ControlledInput
          istextArea
          name="descriptionOfChallenges"
          inputDescriptionTitle={
            CHALLENGES_FIELD_INFO.descriptionOfChallenges.title
          }
          inputDescriptionSubtitle={
            CHALLENGES_FIELD_INFO.descriptionOfChallenges.subtitle
          }
          helperText={CHALLENGES_FIELD_INFO.descriptionOfChallenges.helper}
        />
      </Grid2>
      <Divider />
      <Grid2 size={{ sm: 12, xs: 12, xxs: 12 }}>
        <ControlledInput
          istextArea
          name="descriptionOfOpportunitiesIdentified"
          inputDescriptionTitle={
            CHALLENGES_FIELD_INFO.descriptionOfOpportunities.title
          }
          inputDescriptionSubtitle={
            CHALLENGES_FIELD_INFO.descriptionOfOpportunities.subtitle
          }
          helperText={CHALLENGES_FIELD_INFO.descriptionOfOpportunities.helper}
        />
      </Grid2>
    </Grid2>
  );
}
