import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import type { FC, MouseEvent } from "react";
import { Fragment, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  DeleteIconWrapper,
  DragAndDropContainer,
  LoadedFileInfo,
  LoadedFileSize,
  LoadingFileInfo,
  LoadingFileSize,
  SelectErrorSubtitle,
  SelectErrorTitle,
  SelectLabelContainer,
  StyledGrid,
  UploaderContainer,
  UploaderInfoCol,
  UploadLink,
  WrapperBeforeUpload,
  WrapperUploadIcon,
} from "./Uploader.styles";
import type { IUploader, UploaderErrorMessage } from "./Uploader.types";
import { generateErrorMessage } from "./Uploader.utils";
import { convertFileSize, valueIsEmpty } from "@app/lib/general";
import { ClearIcon, FileUploadImportIcon } from "@app/lib/icons";

const CustomUploader: FC<IUploader> = ({
  value,
  accept,
  error = false,
  fileMaxSize = 25 * 1024 * 1024,
  required,
  label,
  uploaderAfterLabel,
  name,
  loading = false,
  handleDelete,
  handleDeleteServerValue,
  tempDoc,
  onDrop,
  serverValue,
}) => {
  const id = `${name}_${Date.now()}`;
  const [errorMessage, setErrorMessage] = useState<UploaderErrorMessage | null>(
    null,
  );

  useEffect(() => {
    if (!tempDoc) {
      setErrorMessage(null);
    }
  }, [tempDoc]);

  const {
    open,
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    noClick: true,
    multiple: false,
    maxSize: fileMaxSize,
    accept: accept,
    onDrop: onDrop,
    onDropRejected: (fileRejections) => {
      if (fileRejections.length > 0) {
        const { errors } = fileRejections[0] || {};
        const errorType = errors?.[0]?.code || "";
        const errorMessages = generateErrorMessage(
          fileMaxSize,
          errorType,
          accept,
        );
        setErrorMessage(errorMessages);
      }
    },
    onDragEnter: () => {
      const test = generateErrorMessage(fileMaxSize, "", accept);
      setErrorMessage(test);
    },
    onDragLeave: () => {
      setErrorMessage(null);
    },
  });

  let files = acceptedFiles;

  const removeServerFiles = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault();
    files = [];
    if (handleDeleteServerValue) {
      handleDeleteServerValue();
      setErrorMessage(null);
    }
  };

  const removeFiles = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault();
    files = [];
    if (handleDelete) {
      handleDelete();
      setErrorMessage(null);
    }
  };

  return (
    <UploaderContainer data-testid="uploader-container">
      <DragAndDropContainer
        data-testid="uploader-dragAndDropContainer"
        {...getRootProps()}
        $isLoading={loading}
        $isSelected={Boolean(files.length > 0 && value)}
        $isDragAccept={isDragAccept}
        $isDragReject={isDragReject && !valueIsEmpty(errorMessage)}
      >
        <input
          data-testid="uploader-input"
          {...getInputProps({
            id,
            name,
            required,
            alt: label,
            role: "button",
          })}
        />
        {!loading ? (
          <>
            {value && !error && (
              <>
                <StyledGrid
                  error={error.toString()}
                  data-testid="uploader-styledGrid.one"
                >
                  <UploaderInfoCol>
                    {value && (
                      <LoadedFileInfo data-testid="uploader-loadedFileInfo">
                        {value}
                      </LoadedFileInfo>
                    )}
                    {files[0] && (
                      <LoadedFileSize data-testid="uploader-loadedFileSize">
                        {convertFileSize(files[0]?.size)}
                      </LoadedFileSize>
                    )}
                  </UploaderInfoCol>
                  <DeleteIconWrapper data-testid="uploader-grid.delete.one">
                    <div onClick={(e) => removeFiles(e)}>
                      <ClearIcon />
                    </div>
                  </DeleteIconWrapper>
                </StyledGrid>
              </>
            )}
            {error && value && (
              <>
                <StyledGrid
                  error={error.toString()}
                  data-testid="uploader-styledGrid.one"
                >
                  <UploaderInfoCol data-testid="uploader-grid.import.one">
                    {value && (
                      <LoadedFileInfo data-testid="uploader-loadedFileInfo">
                        {value}
                      </LoadedFileInfo>
                    )}
                    {files[0] && (
                      <LoadedFileSize data-testid="uploader-loadedFileSize">
                        {convertFileSize(files[0]?.size)}
                      </LoadedFileSize>
                    )}
                    {error && (
                      <LoadedFileSize data-testid="uploader-loadedFileError">
                        {error.toString()}-{String(errorMessage?.toString())}
                      </LoadedFileSize>
                    )}
                  </UploaderInfoCol>
                </StyledGrid>
              </>
            )}
            {!value && (
              <Fragment>
                <WrapperUploadIcon
                  $isDragAccept={isDragAccept}
                  $isDragReject={isDragReject && !valueIsEmpty(errorMessage)}
                  data-testid="uploader-wrapperUploadIcon"
                >
                  <FileUploadImportIcon />
                </WrapperUploadIcon>
                <WrapperBeforeUpload data-testid="uploader-wrapperBeforeUpload">
                  {isDragReject && !valueIsEmpty(errorMessage) ? (
                    <SelectLabelContainer>
                      <SelectErrorTitle>
                        {" "}
                        {errorMessage?.selectError}{" "}
                      </SelectErrorTitle>
                      <SelectErrorSubtitle>
                        {" "}
                        {errorMessage?.selectErrorAfter}{" "}
                      </SelectErrorSubtitle>
                      <DeleteIconWrapper data-testid="uploader-grid.delete.one">
                        <div onClick={(e) => removeFiles(e)}>
                          <ClearIcon />
                        </div>
                      </DeleteIconWrapper>
                    </SelectLabelContainer>
                  ) : (
                    <>
                      <span> {"Drag and drop or"} </span>
                      <UploadLink
                        onClick={open}
                        aria-label="Import"
                        data-testid="uploader-uploadLink"
                      >
                        {"Select"}
                      </UploadLink>
                      <span>
                        {" "}
                        {uploaderAfterLabel ?? "a file to upload"}
                      </span>{" "}
                    </>
                  )}
                </WrapperBeforeUpload>
              </Fragment>
            )}
          </>
        ) : (
          <StyledGrid data-testid="uploader-styledGrid.two">
            <Grid size={{ xs: 1 }} data-testid="uploader-grid.progress">
              <CircularProgress
                size={20}
                style={{ color: "#1E8BC3" }}
                data-testid="uploader-circularProgress"
              />
            </Grid>
            <Grid size={{ xs: 10 }} data-testid="uploader-grid.import.two">
              {value && (
                <LoadingFileInfo data-testid="uploader-loadingFileInfo">
                  {value}
                </LoadingFileInfo>
              )}

              {files[0] && (
                <LoadingFileSize data-testid="uploader-loadingFileSize">
                  {files[0]?.name}
                  {convertFileSize(files[0]?.size)}
                </LoadingFileSize>
              )}
            </Grid>
            <Grid size={{ xs: 1 }} data-testid="uploader-grid.delete.two">
              <div onClick={(e) => removeFiles(e)}>
                <ClearIcon />
              </div>
            </Grid>
          </StyledGrid>
        )}
      </DragAndDropContainer>

      {!value && !!serverValue && !!serverValue.name && !!serverValue.size && (
        <StyledGrid data-testid="uploader-styledGrid.one">
          <UploaderInfoCol>
            {serverValue.name && (
              <LoadedFileInfo data-testid="uploader-loadedFileInfo">
                {serverValue.name}
              </LoadedFileInfo>
            )}
            {serverValue?.size && (
              <LoadedFileSize data-testid="uploader-loadedFileSize">
                {convertFileSize(serverValue.size)}
              </LoadedFileSize>
            )}
          </UploaderInfoCol>
          <DeleteIconWrapper data-testid="uploader-grid.delete.one">
            <div onClick={(e) => removeServerFiles(e)}>
              <ClearIcon />
            </div>
          </DeleteIconWrapper>
        </StyledGrid>
      )}
    </UploaderContainer>
  );
};

export default CustomUploader;
