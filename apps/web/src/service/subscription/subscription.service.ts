import { IMySubscription } from '@/types/api/payment.types';
import { apiClient } from '../api';

export class SubscriptionService {
  static readonly apiClient = apiClient;
  static headers?: HeadersInit;

  static async createSubscription(priceId: string) {
    return await this.apiClient.post<{ url: string }>('/subscription', {
      priceId,
    });
  }

  static async getCurrentPlan() {
    return await this.apiClient.get<IMySubscription>(
      '/subscription/current-plan',
      {
        headers: this.headers,
      },
    );
  }

  static async cancelSubscription() {
    return await this.apiClient.delete<{ cancelAtPeriodEnd: boolean }>(
      '/subscription',
    );
  }

  static async updateSubscription({
    cancelAtPeriodEnd,
  }: {
    cancelAtPeriodEnd: boolean;
  }) {
    return await this.apiClient.patch<{ cancelAtPeriodEnd: boolean }>(
      '/subscription',
      { cancelAtPeriodEnd },
    );
  }
}
