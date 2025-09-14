import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { uploadImage, UploadImageDto, UploadImageResponse } from '../infraestructure/UploadImage';
import { CATEGORIA_PAGINATED_SEARCH } from '@/modules/dashboard/categoria/application/QueryKeys';

const useUploadPhoto = (): UseMutationResult<UploadImageResponse, Error, UploadImageDto> => {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: async (upload: UploadImageDto) => await uploadImage(upload),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [CATEGORIA_PAGINATED_SEARCH],
      });
    },
  });

  return response;
};

export default useUploadPhoto;
