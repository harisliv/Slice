import type { FC } from "react";
import { StyledTabPanel } from "./Tabs.styles";
import type { ITabPanelProps } from "./Tabs.types";

const TabContent: FC<ITabPanelProps> = ({
  children,
  value,
  index,
  ...props
}) => (
  <StyledTabPanel
    role="tabpanel"
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
    style={{ display: value === index ? "block" : "none" }}
    {...props}
  >
    {children}
  </StyledTabPanel>
);

export default TabContent;
