import { ErrorCard, MainWrapperWithHeader } from "@app/lib/ui";
import { Header } from "@app/components";
import { useActiveInitiative, useCustomRouteError } from "@app/hooks";

export default function HydratedErrorBoundary() {
  const error = useCustomRouteError();
  const { activeInitiative } = useActiveInitiative();
  return (
    <>
      <Header />
      <MainWrapperWithHeader $containerWidth="M">
        <ErrorCard
          error={error}
          initiativeId={activeInitiative?.id}
          initiativeName={activeInitiative?.name}
          email=""
        />
      </MainWrapperWithHeader>
    </>
  );
}
