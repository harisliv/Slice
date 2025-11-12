import type { Table } from "@tanstack/react-table";
import type { TMyParticipants } from "@app/types";

export interface IPaginationProps {
  table: Table<TMyParticipants>;
  paginationText?: string;
}

type ItemsPerPageOptions = [
  { label: "10"; value: "10" },
  { label: "25"; value: "25" },
  { label: "50"; value: "50" },
  { label: "100"; value: "100" },
];

export const itemsPerPageOptions: ItemsPerPageOptions = [
  { label: "10", value: "10" },
  { label: "25", value: "25" },
  { label: "50", value: "50" },
  { label: "100", value: "100" },
];
