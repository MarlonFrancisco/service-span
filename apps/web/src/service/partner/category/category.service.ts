import { ICategory } from '@/types/api/service.types';
import { apiClient } from '../../api';
import { HttpClientService } from '../../api/http-client.service';

export class CategoryService {
  static readonly apiClient: HttpClientService = apiClient;

  static async getAll(storeId: string) {
    return await this.apiClient.get<ICategory[]>(
      `/partner/stores/${storeId}/categories`,
    );
  }

  static async create(storeId: string, category: Partial<ICategory>) {
    return await this.apiClient.post<ICategory>(
      `/partner/stores/${storeId}/categories`,
      category,
    );
  }

  static async update(storeId: string, category: Partial<ICategory>) {
    return await this.apiClient.put<ICategory>(
      `/partner/stores/${storeId}/categories/${category.id}`,
      category,
    );
  }

  static async delete(storeId: string, categoryId: string) {
    return await this.apiClient.delete<ICategory>(
      `/partner/stores/${storeId}/categories/${categoryId}`,
    );
  }
}
