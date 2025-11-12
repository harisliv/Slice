import {
  logger,
  maxCurrentYearMandatorySchemaType,
  socialProfileSchemaType,
  stringSchemaMandatoryType,
  stringSchemaOptionalType,
  yearOptionalSchemaType,
} from "@app/utils";
import { constructErrorResponseFromZod } from "@app/utils/error";
import { z } from "zod";

export const initiativeInformationShape = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1, "Initiative name is required")
    .max(200, "Maximum 200 characters allowed"),
  website: z
    .string()
    .url("Please enter a valid URL")
    .min(1, "Please enter a valid URL")
    .nullable(),
  socialProfiles: z.object({
    Twitter: socialProfileSchemaType,
    Facebook: socialProfileSchemaType,
    LinkedIn: socialProfileSchemaType,
    Instagram: socialProfileSchemaType,
    YouTube: socialProfileSchemaType,
  }),
  logoBase64: z.string().nullable(),
  launchDate: maxCurrentYearMandatorySchemaType(),
  launchEvent: stringSchemaOptionalType(),
  expectedEndDate: yearOptionalSchemaType,
  initiativeStatus: stringSchemaMandatoryType(),
  explanationStatus: stringSchemaOptionalType({ maxChars: 3000 }),
  summaryOutcomes: stringSchemaOptionalType({ maxChars: 3000 }),
  closureReport: z
    .object({
      id: z.string().nullable(),
      name: z.string().nullable(),
      size: z.number().nullable(),
      url: z.string().nullable(),
      sharePointId: z.string().nullable(),
    })
    .nullable(),
  contactEmail: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Please enter a valid email address"),
  contactOrganizations: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .max(3),
});

export const initiativeInformationSuperRefine = (
  data: z.infer<typeof initiativeInformationShape>,
  ctx: z.RefinementCtx,
) => {
  if (
    data.launchDate &&
    data.expectedEndDate &&
    data.expectedEndDate < data.launchDate
  ) {
    ctx.addIssue({
      path: ["expectedEndDate"],
      message: "Expected end date must be greater than or equal to launch date",
      code: z.ZodIssueCode.custom,
    });
    ctx.addIssue({
      path: ["launchDate"],
      message: "Launch date must be less than or equal to expected end date",
      code: z.ZodIssueCode.custom,
    });
  }

  if (data.initiativeStatus === "Concluded") {
    if (!data.summaryOutcomes || data.summaryOutcomes.trim().length === 0) {
      ctx.addIssue({
        path: ["summaryOutcomes"],
        message:
          "Summary outcomes is required when initiative status is concluded",
        code: z.ZodIssueCode.custom,
      });
    }

    if (!data.explanationStatus || data.explanationStatus.trim().length === 0) {
      ctx.addIssue({
        path: ["explanationStatus"],
        message:
          "Explanation of status is required when initiative status is concluded",
        code: z.ZodIssueCode.custom,
      });
    }
  }
};

export const initiativeInformationSchema =
  initiativeInformationShape.superRefine(initiativeInformationSuperRefine);

export type InitiativeInformationFormData = z.infer<
  typeof initiativeInformationShape
>;

export const initiativeInformationShapeProps = z.object({
  ...initiativeInformationShape._def.shape,
});

export const isInitiativeInformationShape = (
  value: unknown,
  withLogs: boolean = true,
): value is InitiativeInformationFormData => {
  const result = initiativeInformationShapeProps.safeParse(value);
  if (result.error && withLogs) {
    logger.error(
      "Invalid response format",
      new Error("Initiative Information"),
      constructErrorResponseFromZod(result),
    );
  }
  return result.success;
};

export const isInitiativeInformationSchema = (
  value: unknown,
  withLogs: boolean = true,
): value is InitiativeInformationFormData => {
  const result = initiativeInformationSchema.safeParse(value);
  if (result.error && withLogs) {
    logger.error(
      "Invalid response format",
      new Error("Initiative Information"),
      constructErrorResponseFromZod(result),
    );
  }
  return result.success;
};

export const defaultInitiativeInformationFormValues: InitiativeInformationFormData =
  {
    id: "",
    name: "",
    website: "",
    socialProfiles: {
      Twitter: "",
      Facebook: "",
      LinkedIn: "",
      Instagram: "",
      YouTube: "",
    },
    logoBase64: "",
    launchDate: NaN,
    launchEvent: "",
    expectedEndDate: NaN,
    initiativeStatus: "",
    explanationStatus: "",
    summaryOutcomes: "",
    closureReport: {
      id: null,
      name: null,
      size: null,
      url: null,
      sharePointId: null,
    },
    contactEmail: "",
    contactOrganizations: [],
  };
