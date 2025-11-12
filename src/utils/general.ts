import dayjs from "dayjs";
import { isNumber } from "lodash";
import { z } from "zod";

export const convertToValidUrl = (url: string) => {
  try {
    const urlWithProtocol =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;
    new URL(urlWithProtocol);
    return urlWithProtocol;
  } catch {
    return "";
  }
};

export const convertToValidEmail = (email: string) => {
  const trimmed = email.trim();
  const match = trimmed.match(/^(.*?\.com)\b/i);
  return match ? match[1] : trimmed;
};

export const formatDate = (date: string | null) =>
  dayjs(date).format("DD-MM-YYYY");

export const formatDateTime = (date: string | null) =>
  dayjs(date).format("DD-MM-YYYY HH:mm:ss");

// export const normalizeString = (value?: string | null) => {
//   if (value === '' || value === undefined) {
//     return null;
//   }
//   return value;
// };
export const isInvalidString = (value?: string | null) =>
  value === "" || value === null || value === undefined;

export const normalizeString = (value?: string | null) => value ?? "";

export const normalizeObjectOfStrings = (
  value?: Record<string, string | null>,
) =>
  value
    ? Object.fromEntries(
        Object.entries(value).map(([k, v]) => [k, normalizeString(v)]),
      )
    : {};

export const normalizeDateTime = (value?: string | null) => value ?? "";

export const normalizeNumber = (value?: number | null) => {
  if (value === undefined || value === null) {
    return NaN;
  }
  return value;
};

export const normalizeStringArray = (value?: string[] | null): string[] =>
  value ?? [];

export const convertToValidSelectValue = (value?: string | null) =>
  value || null;

export const convertToValidMultiSelectValue = (value?: string[]): string[] =>
  value ?? []; // send empty array instead of null (BE requirement)

export const socialProfileSchemaType = z
  .string()
  .url("Please enter a valid URL")
  .or(z.literal(""))
  .optional()
  .nullable();

export const stringSchemaMandatoryType = ({
  maxChars = 300,
  minChars,
  maxMessage,
}: {
  maxChars?: number;
  minChars?: number;
  maxMessage?: string;
} = {}) =>
  z
    .string()
    .min(minChars || 1, "Required field")
    .max(maxChars, maxMessage || `Maximum ${maxChars} characters allowed`);
// .nullable();

export const stringSchemaOptionalType = ({
  maxChars = 300,
  maxMessage,
}: {
  maxChars?: number;
  maxMessage?: string;
} = {}) =>
  z
    .string()
    .max(maxChars, maxMessage || `Maximum ${maxChars} characters allowed`)
    .nullable();

export const arrayStringSchemaRequiredType = ({
  msg,
}: {
  msg?: string;
} = {}) => z.array(z.string()).min(1, msg || "Required field");

export const numberMandatorySchemaType = z.number().min(1);

export const numberOptionalSchemaType = z.union([z.number(), z.nan()]);

export const yearMandatorySchemaType = ({
  minYear = 1991,
}: { minYear?: number } = {}) =>
  z
    .number()
    .min(minYear, `Year must be greater than ${minYear}`)
    .max(
      new Date().getFullYear() + 100,
      "Year must be less than or equal to the current year",
    );

export const maxCurrentYearMandatorySchemaType = () =>
  z
    .number()
    .max(
      new Date().getFullYear(),
      "Year must be less than or equal to the current year",
    )
    .min(1900, "Year must be greater than 1900");

export const yearOptionalSchemaType = z.union([
  yearMandatorySchemaType(),
  z.nan(),
]);

export const dropdownSchemaOptionalType = z.object({
  label: z.string(),
  value: z.string(),
});

export const isDropdownSchemaOptionalType = (
  v: unknown,
): v is z.infer<typeof dropdownSchemaOptionalType> =>
  dropdownSchemaOptionalType.safeParse(v).success;

export const dropdownSchemaOptionalTypeArray = z.array(
  z.object({
    label: z.string(),
    value: z.string(),
  }),
);

export const dropdownSchemaMandatoryType = ({
  // TODO REPLACE IN ALL SMARTDROPDOWN MAYBE
  maxItems,
}: {
  maxItems?: number;
} = {}) =>
  dropdownSchemaOptionalTypeArray.min(1, "Required field").max(maxItems || 3);

export const renderValueOrHyphen = (
  value: string | string[] | number | undefined | null,
) => {
  if (value === undefined || value === null) {
    return "-";
  }

  if (Array.isArray(value)) {
    const joined = value
      .map((v) => (v ?? "").toString().trim())
      .filter((v) => v.length > 0)
      .join(", ");
    return joined || "-";
  }

  if (isNumber(value) && isNaN(value as number)) {
    return "-";
  }

  const s = value.toString().trim();
  return s.length ? s : "-";
};

export const formatAndSplitDateTime = (date: string | null | undefined) => {
  if (!date) return { date: "", hour: "" };
  const d = dayjs(date, "MM/DD/YYYY HH:mm:ss");
  return {
    date: d.isValid() ? d.format("YYYY-MM-DD") : "",
    hour: d.isValid() ? d.format("HH:mm") + " h" : "",
  };
};
