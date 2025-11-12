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

  const baseUrl = import.meta.env.VITE_API_URL;

  const transformToFieldValue = (
    accFiles: File[],
    field: ControllerRenderProps<FieldValues>
  ) => {
    const file = accFiles[0];

    if (file) {
      setFileLocally(file);
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result?.toString().split(',')[1];
        if (typeof base64 === 'string') {
          if (name === 'logoBase64') {
            field.onChange(base64);
          } else {
            const pureFile = new File([file], file.name, {
              type: file.type,
              lastModified: file.lastModified
            });
            const id = await mutateAsync(pureFile);
            if (id) {
              field.onChange({
                id: null,
                size: file.size,
                sharePointId: id,
                name: file.name,
                url: `${baseUrl}/document/download/${id}`
              });
            }
          }
        }
      };
      reader.readAsDataURL(file);
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
