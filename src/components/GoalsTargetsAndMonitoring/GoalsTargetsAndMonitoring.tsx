import { Tabs } from "@app/lib/ui";
import { useLoaderData } from "react-router";
import Goals from "./Goals";
import Targets from "./Targets";
import Monitoring from "./Monitoring";

export default function GoalsTargetsAndMonitoring() {
  const { initialTab } = useLoaderData() || { initialTab: 0 };

  return (
    <Tabs
      initialTab={initialTab}
      tabs={[
        {
          content: <Goals />,
          label: "Learning objectives​",
        },
        {
          content: <Targets />,
          label: "Assessment criteria",
        },
        {
          content: <Monitoring />,
          label: "Evaluation methods​",
        },
      ]}
    />
  );
}
