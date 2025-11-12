import type { FC, HTMLAttributes, ReactNode } from "react";

export interface AppCardProps extends HTMLAttributes<HTMLDivElement> {
  cardTitle: ReactNode;
  cardSubtitle: ReactNode;
  icon: ReactNode;
  description?: string;
  LinkComponent?: FC<{ to: string }>;
  to?: string;
}
