import { IFavorite } from '@/types/api/favorites.types';
import { apiClient } from '../api';
import { HttpClientService } from '../api/http-client.service';

export class FavoritesService {
  static apiClient: HttpClientService = apiClient;

  static async getAll() {
    return await this.apiClient.get<IFavorite[]>('/users/favorites');
  }

  static async create(favorite: IFavorite) {
    return await this.apiClient.post<IFavorite>('/users/favorites', favorite);
  }

  static async delete(id: string) {
    return await this.apiClient.delete<IFavorite>(`/users/favorites/${id}`);
  }
}
