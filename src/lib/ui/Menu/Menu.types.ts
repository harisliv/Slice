export interface IMenu {
  title: string;
  options?: IMenuOption[];
}

export interface IMenuOption {
  text: string;
  value: string;
  icon?: React.ReactNode;
  onItemClick: () => void;
}
