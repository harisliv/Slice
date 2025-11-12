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
        const response = await apiClient['post'](
          `/document/upload/${activeInitiative?.id}/type/${type}`,
          formData,
          config
        );

        return response.data;
      } catch (error) {
        logger.error(`Failure in uploading file: ${File.name}`, error as Error);
      }
    }
  });

  return mutation;
}
