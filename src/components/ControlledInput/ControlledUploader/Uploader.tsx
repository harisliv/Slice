import {
  Controller,
  useFormContext,
  type ControllerRenderProps,
  type FieldValues
} from 'react-hook-form';
import { FormInputDescription } from '@app/components';
import { Stack } from '@mui/material';
import { type ControlledUploaderProps } from '@app/types';
import CustomUploader from '@app/lib/ui/Uploader/Uploader';
import { useState } from 'react';
import useMutateUploadFile from '@app/hooks/useMutateUploadFile';

export default function ControlledUploader({
  name,
  required,
  inputDescriptionTitle,
  inputDescriptionSubtitle,
  serverValue,
  accept,
  type,
  fileMaxSize
}: ControlledUploaderProps) {
  const { control } = useFormContext();

  const [fileLocally, setFileLocally] = useState<File | undefined>(undefined);

  const { mutateAsync, isPending } = useMutateUploadFile(type);

  const supabaseUrl = import.meta.env.VITE_API_URL; // Supabase project URL

  // Helper function to get Supabase Storage public URL
  // Detects bucket from file path: if path contains "reports/" it's course-documents, otherwise course-assets
  const getSupabaseStorageUrl = (
    filePath: string,
    fileType: 'Initiative' | 'ProgressReport'
  ): string => {
    // Determine bucket based on file path pattern
    // Files in "reports/" folder go to course-documents, "logos/" go to course-assets
    const bucket = filePath.includes('/reports/')
      ? 'course-documents'
      : filePath.includes('/logos/')
        ? 'course-assets'
        : fileType === 'ProgressReport'
          ? 'course-documents'
          : 'course-assets';
    // Supabase Storage public URL format: {projectUrl}/storage/v1/object/public/{bucket}/{path}
    return `${supabaseUrl}/storage/v1/object/public/${bucket}/${filePath}`;
  };

  const transformToFieldValue = (
    accFiles: File[],
    field: ControllerRenderProps<FieldValues>
  ) => {
    const file = accFiles[0];

    if (file) {
      setFileLocally(file);

      if (name === 'logoUrl') {
        // Upload logo to Supabase Storage
        const pureFile = new File([file], file.name, {
          type: file.type,
          lastModified: file.lastModified
        });
        mutateAsync(pureFile)
          .then((filePath) => {
            if (filePath) {
              const storageUrl = getSupabaseStorageUrl(filePath, 'Initiative');
              field.onChange(storageUrl);
            }
          })
          .catch((error) => {
            console.error('Logo upload failed:', error);
          });
      } else {
        // For other files (PDFs, etc.), upload to Supabase Storage
        const pureFile = new File([file], file.name, {
          type: file.type,
          lastModified: file.lastModified
        });
        mutateAsync(pureFile)
          .then((filePath) => {
            if (filePath) {
              const storageUrl = getSupabaseStorageUrl(filePath, type);
              field.onChange({
                id: null,
                size: file.size,
                sharePointId: filePath, // Store the file path as sharePointId
                name: file.name,
                url: storageUrl
              });
            }
          })
          .catch((error) => {
            console.error('File upload failed:', error);
          });
      }
    }
  };

  return (
    <Stack spacing={2}>
      <FormInputDescription
        title={inputDescriptionTitle}
        subtitle={inputDescriptionSubtitle}
        required={required}
      />
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <CustomUploader
            fileMaxSize={fileMaxSize}
            name={field.name}
            loading={isPending}
            serverValue={serverValue}
            value={fileLocally?.name}
            error={!!fieldState.error}
            required={required}
            onDrop={(val: File[]) => {
              transformToFieldValue(val, field);
            }}
            handleDelete={() => {
              field.onChange(null);
              setFileLocally(undefined);
            }}
            handleDeleteServerValue={() => {
              field.onChange(null);
            }}
            accept={accept}
          />
        )}
      />
    </Stack>
  );
}
