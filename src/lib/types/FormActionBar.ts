export type TFormActionBarButtonConfig = {
  enabled?: boolean;
  action?: (data?: any) => void;
  title?: string;
  display: boolean;
};

export interface IFormActionBar {
  next: TFormActionBarButtonConfig;
  previous: TFormActionBarButtonConfig;
  submit: TFormActionBarButtonConfig;
  draft?: TFormActionBarButtonConfig;
  exit: TFormActionBarButtonConfig;
}
