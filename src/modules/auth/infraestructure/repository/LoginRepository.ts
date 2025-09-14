import { API_BASE_URL } from '@/core/constantes/env';

import axios, { AxiosResponse } from 'axios';
import { LoginRequest, LoginResponse } from '../../domain';

export const login = async (login: LoginRequest): Promise<LoginResponse> => {
  const response: AxiosResponse<LoginResponse> = await axios.post(
    `${API_BASE_URL}/api/login`,
    login,
  );

  return response.data;
};
