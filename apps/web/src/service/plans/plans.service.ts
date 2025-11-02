import { IPlansResponse } from '@/types/api';
import { HttpClientService, apiClient } from '../api';

export class PlansService {
  static readonly apiClient: HttpClientService = apiClient;

  static async getPlans() {
    return await this.apiClient.get<IPlansResponse>('/plans');
  }
}
