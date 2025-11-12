import Grid2 from "@mui/material/Grid2";
import FormInputDescription from "@app/components/FormInputDescription";
import { INITIATIVE_INFORMATION_FIELD_INFO } from "@app/constants";
import ControlledInput from "@app/components/ControlledInput";

export default function SocialMedia() {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <FormInputDescription
          title={INITIATIVE_INFORMATION_FIELD_INFO.socialProfiles.title}
          subtitle={INITIATIVE_INFORMATION_FIELD_INFO.socialProfiles.subtitle}
        />
      </Grid2>
      {INITIATIVE_INFORMATION_FIELD_INFO.socialProfiles.fields?.map(
        ({ title, name }, index) => (
          <Grid2 size={4} key={name}>
            <ControlledInput
              key={`socialProfiles.${name}-${index}`}
              name={`socialProfiles.${title}`}
              customGridSize="full"
              inputDescriptionTitle={title}
            />
          </Grid2>
        ),
      )}
    </Grid2>
  );
}
