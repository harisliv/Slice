import {
  stringSchemaMandatoryType,
  stringSchemaOptionalType,
} from "@app/utils";
import { z } from "zod";

export const AccountEntityOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type AccountEntityOption = z.infer<typeof AccountEntityOptionSchema>;

export const AccountEntityDetailsSchema = z.object({
  // required for submission
  name: stringSchemaMandatoryType(),
  country: stringSchemaMandatoryType(),
  type: stringSchemaMandatoryType(),

  // Optional fields
  id: z.string(),
  category: stringSchemaMandatoryType(),
  dateJoined: z
    .string({ message: "Date joined is required" })
    .datetime({ message: "Date joined is required" }),
  legalName: stringSchemaOptionalType(),
  identityType: stringSchemaOptionalType(),
  identityNumber: stringSchemaOptionalType(),
  businessActivity: stringSchemaOptionalType(),
  subnationalGovernmentType: stringSchemaOptionalType(),
  subnationalGovernmentTypeOther: stringSchemaOptionalType(),
  assignedRoles: z.array(z.string()).min(1, "Required field"),
  tempOption: AccountEntityOptionSchema.optional(),
});

export const AccountEntityDetailsShape = z.object({
  ...AccountEntityDetailsSchema._def.shape,
});

export type AccountEntityDetails = z.infer<typeof AccountEntityDetailsSchema>;

export const contactOrganizationSchema = AccountEntityDetailsSchema.pick({
  name: true,
  country: true,
  type: true,
  id: true,
  legalName: true,
  identityType: true,
  identityNumber: true,
  businessActivity: true,
  subnationalGovernmentType: true,
  subnationalGovernmentTypeOther: true,
  tempOption: true,
});

export type ContactOrganizationSchema = z.infer<
  typeof contactOrganizationSchema
>;

export const isContactOrganizationSchema = (
  v: unknown,
): v is ContactOrganizationSchema =>
  contactOrganizationSchema.safeParse(v).success;

export const leadOrganizationsSchema = AccountEntityDetailsSchema.pick({
  name: true,
  country: true,
  type: true,
  id: true,
  legalName: true,
  identityType: true,
  identityNumber: true,
  businessActivity: true,
  subnationalGovernmentType: true,
  subnationalGovernmentTypeOther: true,
  assignedRoles: true,
  tempOption: true,
});

export type LeadOrganizationsSchema = z.infer<typeof leadOrganizationsSchema>;

export const contactOrganizationSchemaDefault: ContactOrganizationSchema = {
  id: "",
  name: "",
  country: "",
  type: "",
  legalName: "",
  identityType: "",
  identityNumber: "",
  businessActivity: "",
  subnationalGovernmentType: "",
  subnationalGovernmentTypeOther: "",
};

export const leadOrganizationsSchemaDefault: LeadOrganizationsSchema = {
  id: "",
  name: "",
  country: "",
  type: "",
  legalName: "",
  identityType: "",
  identityNumber: "",
  businessActivity: "",
  subnationalGovernmentType: "",
  subnationalGovernmentTypeOther: "",
  assignedRoles: [],
};

export const participantCreationSchemaDefault: ParticipantCreationSchema = {
  id: "",
  name: "",
  country: "",
  type: "",
  category: "",
  legalName: "",
  dateJoined: "",
  identityType: "",
  identityNumber: "",
  businessActivity: "",
  subnationalGovernmentType: "",
  subnationalGovernmentTypeOther: "",
};

export const participantCreationSchema = AccountEntityDetailsSchema.pick({
  name: true,
  country: true,
  type: true,
  id: true,
  category: true,
  legalName: true,
  dateJoined: true,
  identityType: true,
  identityNumber: true,
  businessActivity: true,
  subnationalGovernmentType: true,
  subnationalGovernmentTypeOther: true,
  tempOption: true,
});

export type ParticipantCreationSchema = z.infer<
  typeof participantCreationSchema
>;

const participantUpdateSchema = AccountEntityDetailsSchema.pick({
  category: true,
  dateJoined: true,
  id: true,
});

export type ParticipantUpdateSchema = z.infer<typeof participantUpdateSchema>;

export const isParticipantUpdateSchema = (
  v: unknown,
): v is ParticipantUpdateSchema => participantUpdateSchema.safeParse(v).success;

// Default values for discriminated union schemas
export const smartDropdownSchemaDefaults = {
  contactOrganization: {
    schemaType: "contactOrganization",
    ...contactOrganizationSchemaDefault,
  },
  leadOrganizations: {
    schemaType: "leadOrganizations",
    ...leadOrganizationsSchemaDefault,
  },
  participantCreation: {
    schemaType: "participantCreation",
    ...participantCreationSchemaDefault,
  },
} as const;

// -------------------------------------

export type Option = { label: string; value: string };

export type DropdownAccountsDTO = {
  id: string;
  name: string;
};

export type AccountEntityCreateDTO = {
  id?: string;
  name: string;
  country: string;
  type: string;
  category: string | null;
  dateJoined: string | null;
  legalName: string | null;
  subnationalGovernmentType: string | null;
  subnationalGovernmentTypeOther: string | null;
  identityType: string | null;
  identityNumber: string | null;
  businessActivity: string | null;
  initiativeId?: string;
};

export type SmartDropdownProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  submitLabel: string;
  addAnotherLabel: string;
  canAddMore?: boolean;
  onSubmit: (items: Option, details: SmartDropdownData) => void;
};

export type spanOption = "full" | "half" | "third";

export type SCHEMA_TYPE =
  | "contactOrganization"
  | "leadOrganizations"
  | "participantCreation";

// Discriminated union schema that automatically validates based on schemaType
export const SmartDropdownSchema = z
  .discriminatedUnion("schemaType", [
    z.object({
      schemaType: z.literal("contactOrganization"),
      ...contactOrganizationSchema.shape,
    }),
    z.object({
      schemaType: z.literal("leadOrganizations"),
      ...leadOrganizationsSchema.shape,
    }),
    z.object({
      schemaType: z.literal("participantCreation"),
      ...participantCreationSchema.shape,
    }),
  ])
  .superRefine((data, ctx) => {
    if (data.type === "Subnational Government Agency") {
      if (!data.subnationalGovernmentType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Subnational government type is required",
          path: ["subnationalGovernmentType"],
        });
      }

      if (
        data.subnationalGovernmentType === "Other" &&
        !data.subnationalGovernmentTypeOther
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Subnational government type other is required",
          path: ["subnationalGovernmentTypeOther"],
        });
      }
    }
  });

export type SmartDropdownData = z.infer<typeof SmartDropdownSchema>;

// Type guards for better type safety
export const isContactOrganizationData = (
  data: SmartDropdownData,
): data is SmartDropdownData & { schemaType: "contactOrganization" } =>
  data.schemaType === "contactOrganization";

export const isLeadOrganizationsData = (
  data: SmartDropdownData,
): data is SmartDropdownData & { schemaType: "leadOrganizations" } =>
  data.schemaType === "leadOrganizations";

export const isParticipantCreationData = (
  data: SmartDropdownData,
): data is SmartDropdownData & { schemaType: "participantCreation" } =>
  data.schemaType === "participantCreation";
