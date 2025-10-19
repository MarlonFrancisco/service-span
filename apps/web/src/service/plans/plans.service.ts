import { IPlansResponse } from '@/types/api';
import { getQueryClient } from '@/utils/helpers/query.helper';
import { HttpClientService, apiClient } from '../api';

export class PlansService {
  static readonly apiClient: HttpClientService = apiClient;

  static async getPlansQuery() {
    const queryClient = getQueryClient();
    const response = await queryClient.fetchQuery({
      queryKey: ['plans'],
      queryFn: () => this.apiClient.get<IPlansResponse>('/plans'),
    });
    return response.data;
  }

  static async getPlans() {
    const response = await this.apiClient.get<IPlansResponse>('/plans');
    return response.data;
  }
}
