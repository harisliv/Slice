import type { FC } from "react";

import { StyledDrawer, StyledNavItems } from "./Drawer.styles";
import type { DrawerProps } from "./Drawer.types";
import ButtonComponent from "../Button";

const DrawerNav: FC<DrawerProps> = ({
  open,
  menu = [],
  handleClose,
  LinkComponent,
}) => (
  <StyledDrawer
    anchor={"left"}
    open={open}
    onClose={handleClose}
    data-testid="drawer-menu"
  >
    <StyledNavItems>
      {menu.map(({ text, url }, index) => (
        <ButtonComponent
          customVariant="header-menu-drawer"
          disabled={false}
          key={`Option-${text}-${index}`}
          to={url}
          RouterLink={LinkComponent}
        >
          {text}
        </ButtonComponent>
      ))}
    </StyledNavItems>
  </StyledDrawer>
);

export default DrawerNav;
