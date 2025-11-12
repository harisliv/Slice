import { Divider, Stack } from "@mui/material";
import DedicatedStaff from "./components/DedicatedStaff";
import OrganizationalArrangement from "./components/OrganizationalArrangement";
import StaffingInformation from "./components/StaffingInformation";

export default function OrganizationalArrangements() {
  return (
    <Stack spacing={2}>
      <OrganizationalArrangement />
      <Divider />
      <DedicatedStaff />
      <Divider />
      <StaffingInformation />
    </Stack>
  );
}
