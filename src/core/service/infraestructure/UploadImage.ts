import { API_BASE_URL } from '@/core/constantes/env';
import axios, { AxiosResponse } from 'axios';

export const uploadImage = async (upload: UploadImageDto): Promise<UploadImageResponse> => {
  const formData = new FormData();
  formData.append('file', upload.file);
  formData.append('carpeta', upload.carpeta);

  if (upload.publicIdAntiguo) {
    formData.append('publicIdAntiguo', upload.publicIdAntiguo);
  }
  const response: AxiosResponse<UploadImageResponse> = await axios.post(
    `${API_BASE_URL}/api/upload/actualizar-imagen`,
    formData,
  );
  return response.data;
};

export interface UploadImageDto {
  file: File; // Equivalente a IFormFile en .NET
  carpeta: string; // Carpeta donde guardarás la imagen
  publicIdAntiguo?: string; // Opcional, el id anterior
}

export interface UploadImageResponse {
  publicId: string;
}
