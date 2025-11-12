import { useMediaQuery, useTheme } from "@mui/system";
import type { FC } from "react";
import React, { useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@app/lib/icons";
import { Theme } from "@app/lib/general";
import { valueIsEmpty } from "@app/lib/general";
import TabContent from "./TabContent";
import {
  NavigationButton,
  StyledNavigationWrapper,
  StyledTab,
  StyledTabs,
  StyledTabsWrapper,
} from "./Tabs.styles";
import type { ITabItem, ITabsProps } from "./Tabs.types";

const Tabs: FC<ITabsProps> = ({
  tabs,
  enableNavigationButtons = true,
  onTabChange,
  initialTab,
  ...props
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(Theme.breakpoints.xs));
  const [value, setValue] = useState<number>(Number(initialTab) || 0);

  const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onTabChange?.(newValue);
  };

  const handlePrevious = () => {
    setValue((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setValue((prev) => (prev < tabs.length - 1 ? prev + 1 : prev));
  };

  const renderedTabs = useMemo(
    () =>
      tabs.map((tab: ITabItem, index: number) => (
        <StyledTab
          key={`${tab.label}-${index}`}
          label={
            valueIsEmpty(tab.count) ? tab.label : `${tab.label} (${tab.count})`
          }
          id={`tab-${index}`}
          aria-controls={`tabpanel-${index}`}
        />
      )),
    [tabs, value],
  );

  const renderedTabContent = useMemo(
    () =>
      tabs.map(
        (tab: ITabItem, index: number) =>
          tab.content && (
            <TabContent
              key={`${tab.label}-${index}`}
              value={value}
              index={index}
            >
              {tab.content}
            </TabContent>
          ),
      ),
    [tabs, value],
  );

  return (
    <StyledTabsWrapper data-testid="tabs-wrapper">
      <StyledNavigationWrapper>
        {enableNavigationButtons && !isDesktop && (
          <>
            {value !== 0 && (
              <NavigationButton onClick={handlePrevious} disabled={value === 0}>
                <ChevronLeftIcon />
              </NavigationButton>
            )}
          </>
        )}
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="Navigation tabs"
          role="tablist"
          slotProps={{
            indicator: {
              style: {
                border: "0px solid",
                borderRadius: "25px",
              },
            },
          }}
          {...props}
        >
          {renderedTabs}
        </StyledTabs>
        {enableNavigationButtons && !isDesktop && (
          <>
            {value !== tabs.length - 1 && (
              <NavigationButton
                onClick={handleNext}
                hidden={value === tabs.length - 1}
              >
                <ChevronRightIcon />
              </NavigationButton>
            )}
          </>
        )}
      </StyledNavigationWrapper>
      {renderedTabContent}
    </StyledTabsWrapper>
  );
};

export default Tabs;
