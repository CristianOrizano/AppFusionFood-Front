import axios, { AxiosResponse } from 'axios';
import { ClientRequest } from 'http';
import { CategoriaFilter, CategoriaRequest, CategoriaResponse } from '../../domain';
import { API_BASE_URL } from '@/core/constantes/env';
import { stringify } from 'qs';
import PaginationRequest from '@/core/types/PaginationRequest';
import PaginationResponse from '@/core/types/PaginationResponse';

export const create = async (categoria: CategoriaRequest): Promise<CategoriaResponse> => {
  const response: AxiosResponse<CategoriaResponse> = await axios.post(
    `${API_BASE_URL}/api/categoria`,
    categoria,
  );
  return response.data;
};

export const update = async (id: number, categoria: CategoriaRequest): Promise<CategoriaResponse> => {
  const response: AxiosResponse<CategoriaResponse> = await axios.put(
    `${API_BASE_URL}/api/categoria/${id}`,
    categoria,
  );
  return response.data;
};

export const deleteById = async (id: number): Promise<CategoriaResponse> => {
  const response: AxiosResponse<CategoriaResponse> = await axios.delete(
    `${API_BASE_URL}/api/categoria/${id}`,
  );
  return response.data;
};

export const findById = async (id: number): Promise<CategoriaResponse> => {
  const response: AxiosResponse<CategoriaResponse> = await axios.get(`${API_BASE_URL}/api/categoria/${id}`);
  return response.data;
};

export const findAll = async (): Promise<CategoriaResponse[]> => {
  const response: AxiosResponse<CategoriaResponse[]> = await axios.get(`${API_BASE_URL}/api/categoria`);
  return response.data;
};

export const paginatedSearch = async (
  paginationRequest: PaginationRequest<CategoriaFilter>,
): Promise<PaginationResponse<CategoriaResponse>> => {
  const paramsString: string = stringify(paginationRequest, {
    allowDots: true,
  });

  const response: AxiosResponse<PaginationResponse<CategoriaResponse>> = await axios.get(
    `${API_BASE_URL}/api/categoria/busquedapaginada?${paramsString}`,
  );

  return response.data;
};
