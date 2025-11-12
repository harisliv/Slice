import { useMediaQuery, useTheme } from "@mui/material";
import type { FC } from "react";
import { memo, useState } from "react";
import { BurgerMenuIcon, ExitIcon, LogoutIcon, LogoIcon } from "@app/lib/icons";
import Drawer from "../Drawer";
import {
  HeaderWrapper,
  InfoWrapper,
  NavActionsWrapper,
  NavItemWrapper,
  SpaceFiller,
  StyledContentContainer,
  StyledHeaderNav,
  StyledMenuButton,
  StyledNavActionButton,
  StyledNavItems,
  StyledPageInfo,
  StyledPageName,
} from "./Header.styles";
import type { IHeader } from "./Header.types";
import { Theme } from "@app/lib/general";
import { Header5 } from "../Global";
import ButtonComponent from "../Button";

const Header: FC<IHeader> = ({
  handleLogout,
  menuItems,
  disableHeaderLinks = false,
  LinkComponent,
}) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down(Theme.breakpoints.md));
  const isSmallMobile = useMediaQuery(
    theme.breakpoints.down(Theme.breakpoints.xxs),
  );
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  return (
    <HeaderWrapper>
      {isMobile && (
        <Drawer
          open={openDrawer}
          menu={menuItems}
          handleClose={() => setOpenDrawer(false)}
          disableLinks={disableHeaderLinks}
          LinkComponent={LinkComponent}
        />
      )}
      <StyledHeaderNav data-testid="nav">
        <StyledContentContainer>
          <InfoWrapper data-testid="header-nav.info-wrapper">
            <StyledPageInfo data-testid="header-nav.page-info">
              {isMobile && (
                <StyledMenuButton
                  onClick={() => setOpenDrawer((prev) => !prev)}
                  data-testid="MenuButton"
                  tabIndex={0}
                >
                  {openDrawer ? <ExitIcon /> : <BurgerMenuIcon />}
                </StyledMenuButton>
              )}
              <LogoIcon aria-label="Main Logo" />
              <StyledPageName data-testid="header-nav.page-name">
                <Header5 variant="default">
                  {isSmallMobile ? "ISS" : "INITIATIVE self-service"}
                </Header5>
              </StyledPageName>
            </StyledPageInfo>
            <SpaceFiller />
            {!isMobile && (
              <StyledNavItems data-testid="header-nav.items">
                {menuItems.map(({ text, url }, index) => (
                  <NavItemWrapper
                    key={text}
                    data-testid="header-nav.item-wrapper"
                    className="header-nav-item"
                  >
                    <ButtonComponent
                      customVariant="header-menu"
                      key={`Option-${text}-${index}`}
                      to={url}
                      RouterLink={LinkComponent}
                      disabled={disableHeaderLinks}
                    >
                      {text}
                    </ButtonComponent>
                  </NavItemWrapper>
                ))}
              </StyledNavItems>
            )}
          </InfoWrapper>
          <NavActionsWrapper data-testid="header-nav.user-info">
            <StyledNavActionButton
              tabIndex={0}
              onClick={() => handleLogout()}
              data-testid="header-nav.icon-button.logout"
            >
              <LogoutIcon />
            </StyledNavActionButton>
          </NavActionsWrapper>
        </StyledContentContainer>
      </StyledHeaderNav>
    </HeaderWrapper>
  );
};

export default memo(Header);
