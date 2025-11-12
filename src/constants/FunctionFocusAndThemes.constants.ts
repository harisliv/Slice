export const FUNCTION_FOCUS_THEMES_FIELD_INFO: Record<
  keyof Omit<any, "id" | "closureReport.id">,
  {
    title: string;
    subtitle: string;
    fields?: { title: string; name: string }[];
    options?: { value: string; label: string; description?: string }[];
    regions?: "Global" | "Regions" | "Countries" | "Country";
    helper?: string;
  }
> = {
  functions: {
    title: "Functions",
    subtitle: "Functions of the initiative",
    options: [
      { value: "Item 1", label: "Item 1", description: "Item 1" },
      { value: "Item 2", label: "Item 2", description: "Item 2" },
      { value: "Item 3", label: "Item 3", description: "Item 3" },
    ],
  },
  focuses: {
    title: "Focuses",
    subtitle: "Climate focus",
    options: [
      { value: "Item 1", label: "Item 1", description: "Item 1" },
      { value: "Item 2", label: "Item 2", description: "Item 2" },
      { value: "Item 3", label: "Item 3", description: "Item 3" },
    ],
  },
  regions: {
    title: "Geographical focus",
    subtitle: "Regions",
    options: [
      { value: "Item 1", label: "Item 1", description: "Item 1" },
      { value: "Item 2", label: "Item 2", description: "Item 2" },
      { value: "Item 3", label: "Item 3", description: "Item 3" },
    ],
  },
  themes: {
    title: "Themes",
    subtitle: "Marrakech partnership thematic areas",
    options: [
      { value: "Item 1", label: "Item 1", description: "Item 1" },
      { value: "Item 2", label: "Item 2", description: "Item 2" },
      { value: "Item 3", label: "Item 3", description: "Item 3" },
    ],
  },
  sustainableDevGoals: {
    title: "",
    subtitle: "Sustainable development goals",
    options: [
      { value: "Item 1", label: "Item 1", description: "Item 1" },
      { value: "Item 2", label: "Item 2", description: "Item 2" },
      { value: "Item 3", label: "Item 3", description: "Item 3" },
    ],
  },
};
