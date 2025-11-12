import { Divider, Stack } from "@mui/material";
import InitiativeNameField from "./components/InitiativeNameField";
import WebsiteField from "./components/WebsiteField";
import SocialMedia from "./components/SocialMedia";
import LogoUploader from "./components/LogoUploader/LogoUploader";
import LaunchYear from "./components/LaunchYear/LaunchYear";
import LaunchEvent from "./components/LaunchEvent/LaunchEvent";
import ExpectedEndYear from "./components/ExpectedEndYear";

export default function GeneralInformation() {
  return (
    <Stack spacing={2}>
      <InitiativeNameField />
      <Divider />
      <WebsiteField />
      <Divider />
      <SocialMedia />
      <Divider />
      <LogoUploader />
      <Divider />
      <LaunchYear />
      <Divider />
      <LaunchEvent />
      <Divider />
      <ExpectedEndYear />
    </Stack>
  );
}
