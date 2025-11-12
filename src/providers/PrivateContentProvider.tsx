import { Header, OutletWithPermission } from "@app/components";
import ToasterProvider from "./ToasterProvider";

export default function PrivateContentProvider() {
  return (
    <ToasterProvider>
      <Header />
      <OutletWithPermission />
    </ToasterProvider>
  );
}
