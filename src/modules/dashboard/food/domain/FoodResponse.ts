import { CategoriaResponse } from '../../categoria/domain';

export default interface FoodResponse {
  id: number;
  descripcion: string;
  nombre: string;
  categoria: CategoriaResponse;
  nombreImg: string;
  precio: number;
  estado: boolean;
}
