import { type ReactNode } from "react";
import { Toaster } from "@app/lib/ui";
import { useToasterStore } from "@app/hooks";

interface ToasterProviderProps {
  children: ReactNode;
}

export default function ToasterProvider({ children }: ToasterProviderProps) {
  const show = useToasterStore((state) => state.show);
  const message = useToasterStore((state) => state.message);
  const toasterType = useToasterStore((state) => state.toasterType);
  const hideToaster = useToasterStore((state) => state.hideToaster);
  const errorDetails = useToasterStore((state) => state.errorDetails);

  return (
    <>
      {children}

      <Toaster
        open={show}
        message={message}
        toastertype={toasterType}
        onCloseToaster={hideToaster}
        closeButton
        errorDetails={errorDetails}
      />
    </>
  );
}
