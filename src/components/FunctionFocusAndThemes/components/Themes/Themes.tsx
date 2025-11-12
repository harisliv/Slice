import { Stack } from "@mui/system";
import { Divider } from "@mui/material";
import MarrakechThemes from "./components/MarrakechThemes";
import SustainableGoals from "./components/SustainableGoals";

export default function Themes() {
  return (
    <Stack spacing={3}>
      <MarrakechThemes />
      <Divider />
      <SustainableGoals />
    </Stack>
  );
}
