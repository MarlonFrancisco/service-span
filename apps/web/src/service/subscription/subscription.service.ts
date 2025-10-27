import { apiClient } from '../api';

export class SubscriptionService {
  static readonly apiClient = apiClient;

  static async createSubscription(priceId: string) {
    return await this.apiClient.post<{ url: string }>('/subscription', {
      priceId,
    });
  }
}
