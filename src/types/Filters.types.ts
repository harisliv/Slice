import { z } from "zod";

export const defaultFiltersValues: TFilters = {
  country: "",
  type: "",
  category: "",
  entityOperatingName: "",
  pledge: "",
  legalName: "",
  identityType: "",
  identityNumber: "",
  businessActivity: "",
  subnationalGovernment: "",
  participantFocalPoint: "",
  participantEmail: "",
  gcapId: "",
  dateJoinedFrom: "",
  dateJoinedTo: "",
};

export const filtersSchema = z.object({
  country: z.string().nullable(),
  type: z.string().nullable(),
  category: z.string().nullable(),
  entityOperatingName: z.string().nullable(),
  pledge: z.string().nullable(),
  legalName: z.string().nullable(),
  identityType: z.string().nullable(),
  identityNumber: z.string().nullable(),
  businessActivity: z.string().nullable(),
  subnationalGovernment: z.string().nullable(),
  participantFocalPoint: z.string().nullable(),
  participantEmail: z.string().nullable(),
  gcapId: z.string().nullable(),
  dateJoinedFrom: z.string().nullable().nullable(),
  dateJoinedTo: z.string().nullable().nullable(),
});

export type TFilters = z.infer<typeof filtersSchema>;

export const pledges = [
  {
    name: "Yes",
    id: "Yes",
  },
  {
    name: "No",
    id: "No",
  },
];
