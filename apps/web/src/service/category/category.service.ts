import { ICategory } from '@/types/api/service.types';
import { getQueryClient } from '@/utils/helpers/query.helper';
import { apiClient } from '../api';
import { HttpClientService } from '../api/http-client.service';

export class CategoryService {
  static readonly apiClient: HttpClientService = apiClient;

  static async getCategoriesQuery(storeId: string) {
    const queryClient = getQueryClient();
    const response = await queryClient.fetchQuery({
      queryKey: ['categories'],
      queryFn: () =>
        this.apiClient.get<ICategory[]>(
          `/partner/stores/${storeId}/categories`,
        ),
    });
    return response.data;
  }

  static async getCategories(storeId: string) {
    const response = await this.apiClient.get<ICategory[]>(
      `/partner/stores/${storeId}/categories`,
    );
    return response.data;
  }
}
