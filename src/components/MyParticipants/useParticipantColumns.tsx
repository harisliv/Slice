import { createColumnHelper } from "@tanstack/react-table";
import { dateFormat } from "./MyParticipants.types";
import { type TMyParticipants } from "@app/types";
import RemoveParticipant from "./RemoveParticipant";
import dayjs from "dayjs";
import { dateFilterFn } from "./MyParticipants.helpers";
import { useMemo } from "react";
import { formatDate } from "@app/utils/general";

export const useParticipantColumns = () => {
  const columnHelper = createColumnHelper<TMyParticipants>();

  return useMemo(
    () => [
      columnHelper.accessor("entityOperatingName", {
        header: "Entity operating name",
        cell: (info) => info.getValue(),
        sortingFn: "alphanumeric",
        enableHiding: true,
      }),
      columnHelper.accessor("type", {
        header: "Type",
        cell: (info) => info.getValue(),
        sortingFn: "alphanumeric",
      }),
      columnHelper.accessor("country", {
        header: "Country",
        cell: (info) => info.getValue() ?? "",
        sortingFn: "alphanumeric",
      }),
      columnHelper.accessor("category", {
        header: "Category",
        cell: (info) => info.getValue(),
        sortingFn: "alphanumeric",
      }),
      columnHelper.accessor("dateJoined", {
        header: "Date joined",
        cell: (info) => (info.getValue() ? formatDate(info.getValue()) : ""),
        sortingFn: (rowA, rowB, columnId) => {
          const dateA = dayjs(rowA.getValue(columnId), dateFormat).toDate();
          const dateB = dayjs(rowB.getValue(columnId), dateFormat).toDate();
          return dateA.getTime() - dateB.getTime();
        },
        filterFn: dateFilterFn,
      }),
      columnHelper.accessor("pledge", {
        header: "Pledge",
        cell: (info) => info.getValue(),
        sortingFn: "alphanumeric",
      }),
      columnHelper.accessor("legalName", {
        header: "Legal Name",
        cell: (info) => info.getValue(),
        sortingFn: "alphanumeric",
      }),
      columnHelper.accessor("identityType", {
        header: "Identity Type",
        cell: (info) => info.getValue(),
        sortingFn: "alphanumeric",
      }),
      columnHelper.accessor("identityNumber", {
        header: "Identity Number",
        cell: (info) => info.getValue(),
        sortingFn: "alphanumeric",
      }),
      columnHelper.accessor("businessActivity", {
        header: "Business Activity",
        cell: (info) => info.getValue() || "",
        sortingFn: "alphanumeric",
      }),
      columnHelper.accessor("subnationalGovernment", {
        header: "Subnational Government",
        cell: (info) => info.getValue(),
        sortingFn: "alphanumeric",
      }),
      columnHelper.accessor("subnationalGovernmentOther", {
        header: "Subnational Government Other",
        cell: (info) => info.getValue(),
        sortingFn: "alphanumeric",
      }),
      columnHelper.accessor("participantFocalPoint", {
        header: "Participant Focal Point",
        cell: (info) => info.getValue(),
        sortingFn: "alphanumeric",
      }),
      columnHelper.accessor("participantEmail", {
        header: "Participant Email",
        cell: (info) => info.getValue(),
        sortingFn: "alphanumeric",
      }),
      columnHelper.accessor("gcapId", {
        header: "GCAP Id",
        cell: (info) => info.getValue(),
        sortingFn: "alphanumeric",
      }),
      columnHelper.accessor("id", {
        header: "Select for removal",
        cell: (info) => (
          <RemoveParticipant participantId={info.row.original.id} />
        ),
        enableSorting: false,
      }),
    ],
    [columnHelper],
  );
};
