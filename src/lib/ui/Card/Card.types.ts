import type React from "react";

export interface ICard {
  icon?: React.ReactElement;
  backgroundColor?: string;
  title?: string;
  subtitle?: string;
  fullWidth?: boolean;
  children?: React.ReactNode;
}
