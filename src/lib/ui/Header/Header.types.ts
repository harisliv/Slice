import type { TRouterLink } from '@app/lib/types';

export interface IHeader {
  handleLogout: () => void;
  menuItems: IMenu[];
  disableHeaderLinks?: boolean;
  LinkComponent: TRouterLink;
}

export interface IMenu {
  text: string;
  url: string;
}
