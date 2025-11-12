import { type FilterFn } from "@tanstack/react-table";
import { dateFormat } from "./MyParticipants.types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { TFilters, TMyParticipants } from "@app/types";

export const convertFormValuesToColumnFilters = (data: TFilters) => {
  const filterObject = {
    dateJoinedFrom: dayjs(data.dateJoinedFrom).format(dateFormat),
    dateJoinedTo: dayjs(data.dateJoinedTo).format(dateFormat),
    type: data.type,
    country: data.country,
    category: data.category,
    pledge: data.pledge,
    identityType: data.identityType,
    entityOperatingName: data?.entityOperatingName,
    businessActivity: data?.businessActivity,
    subnationalGovernment: data?.subnationalGovernment,
    legalName: data.legalName,
    identityNumber: data.identityNumber,
    participantFocalPoint: data.participantFocalPoint,
    participantEmail: data.participantEmail,
    gcapId: data.gcapId,
  };

  const result: {
    id: string;
    value: string | boolean | string[] | null;
  }[] = [
    ...Object.entries(filterObject)
      .filter(
        ([id, value]) =>
          Boolean(value) && id !== "dateJoinedFrom" && id !== "dateJoinedTo",
      )
      .map(([id, value]) => ({ id, value })),
  ];

  if (
    ![filterObject.dateJoinedFrom, filterObject.dateJoinedTo].includes(
      "Invalid Date",
    )
  ) {
    result.unshift({
      id: "dateJoined",
      value: [filterObject.dateJoinedFrom, filterObject.dateJoinedTo],
    });
  }

  return result;
};

export const dateFilterFn: FilterFn<TMyParticipants> = (
  row,
  columnId,
  filterValue,
) => {
  dayjs.extend(customParseFormat);

  const date = dayjs(row.getValue<string>(columnId)).toDate();
  let [start, end] = filterValue;
  start = dayjs(start, dateFormat).toDate();
  end = dayjs(end, dateFormat).toDate();
  if (!start || !end || !date) return false;
  if (start && end) {
    const res =
      date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
    return res;
  } else return true;
};
