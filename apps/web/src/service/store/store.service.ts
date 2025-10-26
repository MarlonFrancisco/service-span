import { IStore } from '@/types/api/stores.types';
import { getQueryClient } from '@/utils/helpers/query.helper';
import { apiClient } from '../api';
import { HttpClientService } from '../api/http-client.service';

export class StoreService {
  static readonly apiClient: HttpClientService = apiClient;

  static async getStores() {
    return await this.apiClient.get<IStore[]>('/partner/stores');
  }

  static async getStore(storeId: string) {
    return await this.apiClient.get<IStore>(`/partner/stores/${storeId}`);
  }

  static async createStore(store: Partial<IStore>) {
    return await this.apiClient.post<IStore>('/partner/stores', store);
  }

  static async updateStore(store: Partial<IStore>) {
    return await this.apiClient.put<IStore>(
      `/partner/stores/${store.id}`,
      store,
    );
  }

  static async deleteStore(storeId: string) {
    return await this.apiClient.delete<IStore>(`/partner/stores/${storeId}`);
  }

  static async getStoresQuery() {
    const queryClient = getQueryClient();
    const response = await queryClient.fetchQuery({
      queryKey: ['stores'],
      queryFn: () => this.apiClient.get<IStore[]>('/partner/stores'),
    });
    return response.data;
  }
}
