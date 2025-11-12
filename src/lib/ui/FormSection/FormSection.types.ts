import type { SxProps } from "@mui/material";
import type { ReactNode } from "react";
import React from "react";
export interface IFormSection {
  title?: string;
  step?: string;
  subtitle?: React.ReactNode;
  children?: ReactNode;
  isMandatory?: boolean;
  childrenWrapperCustomStyles?: React.CSSProperties;
  variant?: string | null;
  divider?: boolean;
  headerChildren?: ReactNode;
}

export interface Link {
  partOfString: string;
  link: string;
}
export interface CustomChildProps {
  width?: string;
  sx?: SxProps;
}
