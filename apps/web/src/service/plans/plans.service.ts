import { IPlansResponse } from '@/types/api';
import { HttpClientService, apiClient } from '../api';

export class PlansService {
  static readonly apiClient: HttpClientService = apiClient;

  static async getPlans() {
    const response = await this.apiClient.get<IPlansResponse>('/plans', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }
}
