export interface IUploader {
  name: string;
  value?: string;
  showMessage?: boolean;
  serverValue?: {
    id?: string | null;
    size?: number | null;
    url?: string | null;
    name?: string | null;
    sharePointId?: string | null;
  } | null;
  accept: { [key: string]: string[] };
  fileMaxSize?: number;
  uploaderAfterLabel?: string;
  label?: string;
  footnote?: string;
  tooltip?: string;
  error?: boolean;
  noFootnote?: boolean;
  required?: boolean;
  className?: string;
  loading?: boolean;
  handleDelete?: () => void;
  handleDeleteServerValue?: () => void;
  onDrop: (val: File[]) => void;
  tempDoc?: IDocument | null;
}

export interface UploaderErrorMessage {
  selectError: string;
  selectErrorAfter: string;
}
export interface IDocument {
  fileId: string;
  fileName: string;
  title: string;
  file: File | null;
}

export enum IUploaderError {
  LARGE_FILE = 'file-too-large',
  INVALID_FILE_TYPE = 'file-invalid-type'
}
