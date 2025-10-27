import { IStoreGallery } from '@/types/api/stores.types';
import { apiClient } from '../api';
import { HttpClientService } from '../api/http-client.service';

export class GalleryService {
  static readonly apiClient: HttpClientService = apiClient;

  static async getAll(storeId: string) {
    return await this.apiClient.get<IStoreGallery[]>(
      `/partner/stores/${storeId}/gallery`,
    );
  }

  static async update(storeId: string, imageId: string) {
    return await this.apiClient.patch<IStoreGallery>(
      `/partner/stores/${storeId}/gallery/${imageId}`,
      { isMain: true },
    );
  }

  static async create(storeId: string, image: Omit<IStoreGallery, 'id'>) {
    return await this.apiClient.post<IStoreGallery>(
      `/partner/stores/${storeId}/gallery`,
      image,
    );
  }

  static async delete(storeId: string, imageId: string) {
    return await this.apiClient.delete<{ id: string; store: { id: string } }>(
      `/partner/stores/${storeId}/gallery/${imageId}`,
    );
  }
}
