import { IPlansResponse } from '@/types/api';
import { TCurrencyCode } from '@repo/shared/constants';
import { HttpClientService, apiClient } from '../api';

export class PlansService {
  static readonly apiClient: HttpClientService = apiClient;

  static async getPlans(currency: TCurrencyCode) {
    return await this.apiClient.get<IPlansResponse>(
      `/plans?currency=${currency}`,
    );
  }
}
