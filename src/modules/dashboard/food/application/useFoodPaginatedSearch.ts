import { FoodFilter, FoodResponse } from '../domain';
import { DefinedUseQueryResult, useQuery } from '@tanstack/react-query';
import { FOOD_PAGINATED_SEARCH } from './QueryKeys';
import { FoodRepository } from '../infraestructure';
import PaginationRequest from '@/core/types/PaginationRequest';
import PaginationResponse from '@/core/types/PaginationResponse';

const useFoodPaginatedSearch = (
  paginationRequest: PaginationRequest<FoodFilter>,
): DefinedUseQueryResult<PaginationResponse<FoodResponse>, Error> => {
  const response = useQuery({
    queryKey: [FOOD_PAGINATED_SEARCH, paginationRequest],
    queryFn: async () => await FoodRepository.paginatedSearch(paginationRequest),
    retry: 0,
    refetchOnWindowFocus: false,
    initialData: {
      from: 0,
      to: 0,
      perPage: 0,
      currentPage: 0,
      lastPage: 0,
      total: 0,
      data: [],
    },
  });

  return response;
};

export default useFoodPaginatedSearch;
