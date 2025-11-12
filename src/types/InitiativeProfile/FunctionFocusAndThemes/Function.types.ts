import {
  logger,
  stringSchemaMandatoryType,
  stringSchemaOptionalType,
} from "@app/utils";
import { constructErrorResponseFromZod } from "@app/utils/error";
import { z } from "zod";

export const functionShape = z.object({
  initiativePrimaryFunction: stringSchemaMandatoryType(),
  initiativePrimaryFunctionOther: stringSchemaOptionalType({ maxChars: 500 }),
  initiativeSecondaryFunction: z.array(z.string()),
  initiativeSecondaryFunctionOther: stringSchemaOptionalType({ maxChars: 500 }),
});

export const functionSuperRefine = (
  data: z.infer<typeof functionShape>,
  ctx: z.RefinementCtx,
) => {
  if (
    data.initiativePrimaryFunction === "Other, please explain" &&
    !data.initiativePrimaryFunctionOther
  ) {
    ctx.addIssue({
      path: ["initiativePrimaryFunctionOther"],
      message: "Please complete this field",
      code: z.ZodIssueCode.custom,
    });
  }
  if (
    data.initiativeSecondaryFunction?.includes("Other, please explain") &&
    !data.initiativeSecondaryFunctionOther
  ) {
    ctx.addIssue({
      path: ["initiativeSecondaryFunctionOther"],
      message: "Please complete this field",
      code: z.ZodIssueCode.custom,
    });
  }
};

export const functionSchema = functionShape.superRefine(functionSuperRefine);

export type FunctionFormData = z.infer<typeof functionSchema>;

export const isFunctionShape = (
  data: unknown,
  withLogs: boolean = true,
): data is FunctionFormData => {
  const result = functionShape.safeParse(data);
  if (result.error && withLogs) {
    logger.error(
      "Invalid response format",
      new Error("Functions"),
      constructErrorResponseFromZod(result),
    );
  }
  return result.success;
};

export const isFunctionSchema = (
  data: unknown,
  withLogs: boolean = true,
): data is FunctionFormData => {
  const result = functionSchema.safeParse(data);
  if (result.error && withLogs) {
    logger.error(
      "Invalid response format",
      new Error("Functions"),
      constructErrorResponseFromZod(result),
    );
  }
  return result.success;
};

export const defaultFunctionFormValues: FunctionFormData = {
  initiativePrimaryFunction: "",
  initiativePrimaryFunctionOther: null,
  initiativeSecondaryFunction: [],
  initiativeSecondaryFunctionOther: null,
};
