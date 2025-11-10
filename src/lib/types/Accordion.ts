export interface IAccordionItem {
  title: string;
  children: React.ReactNode;
}

export interface IAccordion {
  items: IAccordionItem[];
  allowMultipleOpen?: boolean;
  openIndexes?: number[];
}
