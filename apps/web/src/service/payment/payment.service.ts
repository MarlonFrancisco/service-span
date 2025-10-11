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
}
