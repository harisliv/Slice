import type { FC } from "react";

export type TitleActionProps = {
  title: string;
  to: string;
  RouterLink: FC<{ to: string }>;
  buttonTitle?: string;
};
