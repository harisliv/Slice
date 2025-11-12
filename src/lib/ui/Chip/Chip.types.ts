import type { TRouterLink } from "@app/lib/types";
import type { IMenu } from "../Header/Header.types";

export interface DrawerProps {
  open: boolean;
  menu?: IMenu[];
  handleClose: () => void;
  disableLinks?: boolean;
  LinkComponent: TRouterLink;
}
