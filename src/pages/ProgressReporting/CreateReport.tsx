import { StateAndFormStepperProvider } from "@app/components";
import { CREATE_REPORT_STEPS } from "@app/constants";
import CreateReportContent from "./components/CreateReportContent";
import { useSingleReportLoading } from "@app/hooks";
import { SkeletonComponent } from "@app/lib/ui";
import FormContextProvider from "./components/FormContextProvider";
import { useLoaderData } from "react-router";

export default function CreateReport() {
  const isLoading = useSingleReportLoading();
  const { reportId } = useLoaderData() || { reportId: null };

  return (
    <StateAndFormStepperProvider steps={CREATE_REPORT_STEPS}>
      <FormContextProvider reportId={reportId}>
        {isLoading ? <SkeletonComponent /> : <CreateReportContent />}
      </FormContextProvider>
    </StateAndFormStepperProvider>
  );
}
