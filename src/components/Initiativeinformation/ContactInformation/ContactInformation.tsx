import { Divider, Stack } from "@mui/material";
import Email from "./components/Email";
import ContactOrganization from "./components/ContactOrganization";

export default function ContactInformation() {
  return (
    <Stack spacing={2}>
      <Email />
      <Divider />
      <ContactOrganization />
    </Stack>
  );
}
