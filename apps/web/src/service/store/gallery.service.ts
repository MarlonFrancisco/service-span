import { IStoreGallery } from '@/types/api/stores.types';
import { apiClient } from '../api';
import { HttpClientService } from '../api/http-client.service';

export class GalleryService {
  static readonly apiClient: HttpClientService = apiClient;

  static async getImages(storeId: string) {
    return await this.apiClient.get<IStoreGallery[]>(
      `/partner/stores/${storeId}/gallery`,
    );
  }

  static async updateMainImage(storeId: string, imageId: string) {
    return await this.apiClient.patch<IStoreGallery>(
      `/partner/stores/${storeId}/gallery/${imageId}`,
      { isMain: true },
    );
  }

  static async createImage(storeId: string, image: Omit<IStoreGallery, 'id'>) {
    return await this.apiClient.post<IStoreGallery>(
      `/partner/stores/${storeId}/gallery`,
      image,
    );
  }

  static async deleteImage(storeId: string, imageId: string) {
    return await this.apiClient.delete<void>(
      `/partner/stores/${storeId}/gallery/${imageId}`,
    );
  }
}
