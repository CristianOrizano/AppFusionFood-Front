import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { FoodRequest, FoodResponse } from '../domain';

import { FOOD_PAGINATED_SEARCH } from './QueryKeys';
import { FoodRepository } from '../infraestructure';

const useFoodCreate = (): UseMutationResult<FoodResponse, Error, FoodRequest> => {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: async (categoria: FoodRequest) => await FoodRepository.create(categoria),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [FOOD_PAGINATED_SEARCH],
      });
    },
  });

  return response;
};

export default useFoodCreate;
