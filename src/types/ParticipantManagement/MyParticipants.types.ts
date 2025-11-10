import { z } from 'zod';

export const MyParticipantsSchema = z.object({
  id: z.string(),
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
  subnationalGovernmentOther: z.string().nullable(),
  participantFocalPoint: z.string().nullable(),
  participantEmail: z.string().nullable(),
  gcapId: z.string().nullable(),
  dateJoined: z.string().nullable()
});

export type TMyParticipants = z.infer<typeof MyParticipantsSchema>;

export const defaultMyParticipantsFormValues: TMyParticipants = {
  id: '',
  country: '',
  type: '',
  category: '',
  entityOperatingName: '',
  pledge: '',
  legalName: '',
  identityType: '',
  identityNumber: '',
  businessActivity: '',
  subnationalGovernment: '',
  subnationalGovernmentOther: '',
  participantFocalPoint: '',
  participantEmail: '',
  gcapId: '',
  dateJoined: ''
};
