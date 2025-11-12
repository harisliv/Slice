import { z } from "zod";

const InitiativeInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  lastUpdated: z.string().nullable(),
  lastProgressSubmitted: z.string().nullable(),
  lastParticipantUpdated: z.string().nullable(),
  initiativeStatus: z.string().nullable(),
});

export type InitiativeInfo = z.infer<typeof InitiativeInfoSchema>;

export const isInitiativeInfo = (value: unknown): value is InitiativeInfo[] =>
  z.array(InitiativeInfoSchema).safeParse(value).success;
