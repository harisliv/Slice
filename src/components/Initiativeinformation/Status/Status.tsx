import { Divider, Stack } from "@mui/material";
import {
  ExplanationOfStatus,
  SummaryOutcomes,
  ClosureReport,
} from "./components";
import InitiativeStatus from "./components/InitiativeStatus";
import { useFormContext } from "react-hook-form";

export default function Status() {
  const { watch } = useFormContext();
  const initiativeStatus = watch("initiativeStatus");
  return (
    <Stack spacing={2}>
      <InitiativeStatus />
      {initiativeStatus && initiativeStatus.toLowerCase() === "concluded" && (
        <>
          <Divider />
          <ExplanationOfStatus />
          <Divider />
          <SummaryOutcomes />
          <Divider />
          <ClosureReport />
        </>
      )}
    </Stack>
  );
}
