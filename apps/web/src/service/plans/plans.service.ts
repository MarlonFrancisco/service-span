import { IPlansResponse } from '@/types/api';
import { getQueryClient } from '@/utils/helpers/query.helper';
import { HttpClientService, apiClient } from '../api';

export class PlansService {
  static readonly apiClient: HttpClientService = apiClient;

  static async getPlansQuery() {
    const queryClient = getQueryClient();
    return await queryClient.fetchQuery({
      queryKey: ['plans'],
      queryFn: () => this.apiClient.get<IPlansResponse>('/plans'),
    });
  }

  static async getPlans() {
    return await this.apiClient.get<IPlansResponse>('/plans');
  }
}
