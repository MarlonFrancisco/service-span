import { IPlansResponse } from '@/types/api';
import { apiClient, HttpClientService } from '../api';

export class PaymentService {
  static readonly apiClient: HttpClientService = apiClient;

  static async createPayment(priceId: string) {
    const response = await this.apiClient.post<{ url: string }>(
      '/payment',
      { priceId },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  }

  static async getPlans() {
    const response = await this.apiClient.get<IPlansResponse>(
      '/payment/plans',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data.data;
  }
}
