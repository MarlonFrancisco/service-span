import { apiClient, HttpClientService } from '../api';

export class SubscriptionService {
  static readonly apiClient: HttpClientService = apiClient;

  static async createSubscription(priceId: string) {
    const response = await this.apiClient.post<{ url: string }>(
      '/subscription',
      { priceId },
    );
    return response.data;
  }
}
