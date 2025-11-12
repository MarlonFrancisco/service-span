import { IFavorite } from '@/types/api/favorites.types';
import { apiClient } from '../api';
import { HttpClientService } from '../api/http-client.service';

export class FavoritesService {
  static apiClient: HttpClientService = apiClient;

  static async getAll(userId: string) {
    return await this.apiClient.get<IFavorite[]>(`/users/${userId}/favorites`);
  }

  static async create(favorite: {
    store: { id: string };
    user: { id: string };
  }) {
    return await this.apiClient.post<IFavorite>(
      `/users/${favorite.user.id}/favorites`,
      favorite,
    );
  }

  static async delete(favorite: { id: string; user: { id: string } }) {
    return await this.apiClient.delete<IFavorite>(
      `/users/${favorite.user.id}/favorites/${favorite.id}`,
    );
  }
}
