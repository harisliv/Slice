import { convertFileSize } from "@app/lib/general";
import type { UploaderErrorMessage } from "./Uploader.types";
import { IUploaderError } from "./Uploader.types";

const mimeTypeToFriendlyName: { [key: string]: string } = {
  "application/pdf": "PDF (.pdf)",
  "image/png": "PNG (.png)",
  "image/jpeg": "JPEG (.jpeg)",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "Word (.docx)",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    "Excel (.xlsx)",
  "application/vnd.ms-excel": "Excel (.xlsx)",
};

export const generateErrorMessage = (
  fileMaxSize: number,
  errorType: string,
  accept: {
    [key: string]: string[];
  },
): UploaderErrorMessage => {
  const acceptedFormats = Object.keys(accept)
    .reduce((acc, type) => {
      const mimeTypeName = mimeTypeToFriendlyName[type];
      if (mimeTypeName && !acc.includes(mimeTypeName)) {
        acc.push(mimeTypeName);
      }
      return acc;
    }, [] as string[])
    .join(", ");
  const maxSize = convertFileSize(fileMaxSize);

  switch (errorType) {
    case IUploaderError.LARGE_FILE:
      return {
        selectError: "uploader.errorFileTooLarge",
        selectErrorAfter: `uploader.errorFileTooLargeAfter', maxSize: ${maxSize}`,
      };
    case IUploaderError.INVALID_FILE_TYPE:
      return {
        selectError: "Uploader error invalid file type",
        selectErrorAfter: `Accepted formats include: ${acceptedFormats}`,
      };
    default:
      return {
        selectError: "uploader.selectError",
        selectErrorAfter: "uploader.selectErrorAfter",
      };
  }
};
