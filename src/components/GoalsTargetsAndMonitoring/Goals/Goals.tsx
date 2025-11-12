import { Divider, Stack } from "@mui/material";
import ImpactStatement from "./components/ImpactStatement";
import GoalDescription from "./components/GoalDescription";
import AlignmentParis from "./components/AlignmentParis";
import AdditionalValueInitiative from "./components/AdditionalValueInitiative";
import AlignementMultilateral from "./components/AlignementMultilateral";

export default function Goals() {
  return (
    <Stack spacing={2}>
      <ImpactStatement />
      <Divider />
      <GoalDescription />
      <Divider />
      <AlignmentParis />
      <Divider />
      <AlignementMultilateral />
      <Divider />
      <AdditionalValueInitiative />
    </Stack>
  );
}
