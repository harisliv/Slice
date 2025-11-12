import { logger } from "@app/utils";
import { constructErrorResponseFromZod } from "@app/utils/error";
import { z } from "zod";

export const themesShape = z.object({
  marrakechPartnershipThemes: z.array(z.string()).min(1),
  sustainableDevelopmentGoals: z.array(z.string()).min(1),
});

export const themesSchema = themesShape;

export type ThemesFormData = z.infer<typeof themesSchema>;

export const isThemesSchema = (
  data: unknown,
  withLogs: boolean = true,
): data is ThemesFormData => {
  const result = themesSchema.safeParse(data);
  if (result.error && withLogs) {
    logger.error(
      "Invalid response format",
      new Error("Themes"),
      constructErrorResponseFromZod(result),
    );
  }
  return result.success;
};

export const defaultThemesFormValues: ThemesFormData = {
  marrakechPartnershipThemes: [],
  sustainableDevelopmentGoals: [],
};
