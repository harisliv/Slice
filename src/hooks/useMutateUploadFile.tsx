import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@app/config/axios.config';
import { useActiveInitiative } from './useActiveInitiative';
import type { AxiosRequestConfig } from 'axios';
import { logger } from '@app/utils';

export default function useMutateUploadFile(
  type: 'Initiative' | 'ProgressReport'
) {
  const { activeInitiative } = useActiveInitiative();

  const mutation = useMutation({
    throwOnError: true,
    mutationKey: ['uploadFile'],
    mutationFn: async (file: File) => {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const formData = new FormData();

      formData.append('file', file);

      formData.append('name', file?.name);

      try {
        // Use Supabase Edge Function for file uploads
        const response = await apiClient['post'](
          `/functions/v1/document/upload/${activeInitiative?.id}/type/${type}`,
          formData,
          config
        );

        // Response is the file path from Supabase Storage
        return response.data;
      } catch (error) {
        logger.error(`Failure in uploading file: ${file.name}`, error as Error);
        throw error;
      }
    }
  });

  return mutation;
}
