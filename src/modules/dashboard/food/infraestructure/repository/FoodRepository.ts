import axios, { AxiosResponse } from 'axios';
import { FoodFilter, FoodRequest, FoodResponse } from '../../domain';

import { API_BASE_URL } from '@/core/constantes/env';

import { stringify } from 'qs';
import PaginationRequest from '@/core/types/PaginationRequest';
import PaginationResponse from '@/core/types/PaginationResponse';

export const create = async (categoria: FoodRequest): Promise<FoodResponse> => {
  const response: AxiosResponse<FoodResponse> = await axios.post(`${API_BASE_URL}/api/foodmenu`, categoria);
  return response.data;
};

export const update = async (id: number, categoria: FoodRequest): Promise<FoodResponse> => {
  const response: AxiosResponse<FoodResponse> = await axios.put(
    `${API_BASE_URL}/api/foodmenu/${id}`,
    categoria,
  );
  return response.data;
};

export const deleteById = async (id: number): Promise<FoodResponse> => {
  const response: AxiosResponse<FoodResponse> = await axios.delete(`${API_BASE_URL}/api/foodmenu/${id}`);
  return response.data;
};

export const findById = async (id: number): Promise<FoodResponse> => {
  const response: AxiosResponse<FoodResponse> = await axios.get(`${API_BASE_URL}/api/foodmenu/${id}`);
  return response.data;
};

export const findAll = async (): Promise<FoodResponse[]> => {
  const response: AxiosResponse<FoodResponse[]> = await axios.get(`${API_BASE_URL}/api/foodmenu`);
  return response.data;
};

export const paginatedSearch = async (
  paginationRequest: PaginationRequest<FoodFilter>,
): Promise<PaginationResponse<FoodResponse>> => {
  const paramsString: string = stringify(paginationRequest, {
    allowDots: true,
  });

  const response: AxiosResponse<PaginationResponse<FoodResponse>> = await axios.get(
    `${API_BASE_URL}/api/foodmenu/busquedapaginada?${paramsString}`,
  );

  return response.data;
};
