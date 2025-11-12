import type { TabsProps } from "@mui/material/Tabs";

export interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// TabsComponent.types.ts
export interface ITabItem {
  label: string;
  content: React.ReactNode;
  type?: ITabItemType;
  count?: number;
}

export enum ITabItemType {
  ACTIVITY_INFORMATION = "ACTIVITY_INFORMATION",
  CP_LIST = "CP_LIST",
  PROCESS_INFORMATION = "PROCESS_INFORMATION",
  ACTIVITY_LOG = "ACTIVITY_LOG",
}

export enum ICpListTabState {
  LOADING = "LOADING",
  SUCCESS_EMPTY_STATE = "SUCCESS_EMPTY_STATE",
  SUCCESS_TABLE = "SUCCESS_TABLE",
  SUCCESS_TABLE_WITH_PAGINATION = "SUCCESS_TABLE_WITH_PAGINATION",
  ERROR = "ERROR",
}

export interface ITabsProps extends TabsProps {
  enableNavigationButtons?: boolean;
  tabs: ITabItem[];
  onTabChange?: (tabIndex: number) => void;
  initialTab?: number;
}
