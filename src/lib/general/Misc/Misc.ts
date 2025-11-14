// import { ModalType } from "@app/components/Modal/Modal.types";

/**
 * Tries to parse a string to a JSON object and if it fails,
 * it returns default value (passed in the second parameter)
 *
 * @param data - Data to be parsed
 * @param def  - Value to return in case the parse fails
 * @returns The parsed JSON result or the default value if it fails
 */
export const tryToParseJSON = <T = string>(
  data: string,
  def: T = '' as T
): T => {
  try {
    return JSON.parse(data);
  } catch {
    return def;
  }
};

export const valueIsEmpty = <T>(value: T): boolean =>
  value === undefined || value === null || value === '';

/**
 * Checks if a given string is a valid email address.
 *
 * @param {string} email - The string to be checked.
 * @returns {boolean} - Returns true if the string is a valid email address, otherwise false.
 */
export const isEmail = (value: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return emailRegex.test(value);
};

export const downloadFile = (file: File) => {
  const fileURL = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = fileURL;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const viewFile = (file: File) => {
  const fileURL = URL.createObjectURL(file);
  window.open(fileURL, '_blank');
};

/**
 * Converts a file size in bytes to a specific format.
 *
 * @param {number} bytes - The file size in bytes.
 * @param {number} [decimals] - The number of decimal places to round the result (default is 2).
 * @returns {string} The formatted file size with appropriate unit (e.g., "1,23 MB").
 */
export const convertFileSize = (
  bytes: number,
  decimals = 2,
  decimalSeparator = '.'
): string => {
  if (!bytes) return '';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`.replace(
    '.',
    decimalSeparator
  );
};

/**
 * Converts a File object into a Base64 string (deprecated - use Supabase Storage instead).
 *
 * @param {File} fileToConvert - The file to be converted into a Base64 string.
 * @returns {Promise<string>} A promise that resolves with the Base64 string representation of the file.
 */
// export const convertFileIntoBase64 = (fileToConvert: File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(fileToConvert);
//     reader.onload = () => {
//       if (reader.result) {
//         resolve((reader.result as string).split(",")[1]);
//       } else {
//         reject(new Error("FileReader result is null"));
//       }
//     };
//     reader.onerror = error => reject(error);
//   });
// };

/**
 * Converts a string to camelCase.
 *
 * @param {string} str - The string to convert.
 * @returns {string} - The camelCase version of the string.
 */
export const toCamelCase = (str: string): string =>
  str
    .replace(/\s(.)/g, (_match, group1) => group1.toUpperCase())
    .replace(/[-\s]/g, '')
    .replace(/^(.)/, (_match, group1) => group1.toLowerCase());

/**
 * Compares two strings for equality.
 *
 * @param {string} value - The first string to compare.
 * @param {string} valueToCompare - The second string to compare.
 * @returns {boolean} - Returns true if the strings are equal, otherwise false.
 */
export function areStringsEqual(value: string, valueToCompare: string) {
  return value === valueToCompare;
}

/**
 * Compares two arrays for equality.
 *
 * @param {string[]} a - The first array to compare.
 * @param {string[]} b - The second array to compare.
 * @returns {boolean} - Returns true if the arrays are equal, otherwise false.
 */
export const arraysAreTheSame = (a: string[], b: string[]): boolean => {
  if (a.length !== b.length) return false;
  const setA = new Set(a);
  const setB = new Set(b);
  if (setA.size !== setB.size) return false;
  for (const value of setA) {
    if (!setB.has(value)) return false;
  }
  return true;
};

// export const getModalMaxWidth = (modalType: ModalType) => {
//   switch (modalType) {
//     case ModalType.DOCUMENTS:
//       return "560px";
//     case ModalType.COMMENTS:
//       return "800px";
//     case ModalType.NORMAL:
//       return "472px";
//     default:
//       return "472px";
//   }
// };

export enum FileType {
  PDF = 'application/pdf',
  XLS = 'application/vnd.ms-excel',
  XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  XLSM = 'application/vnd.ms-excel.sheet.macroEnabled.12',
  DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
}

export const isValidEnum = (key: string, enumObj: Record<string, string>) =>
  Object.values(enumObj).includes(key);
