import { IRecommendationStore } from '@/types/api/recomendation.types';
import { apiClient } from '../api';

export class RecomendationService {
  static apiClient = apiClient;
  static headers?: HeadersInit;

  static async getRecommendationStores() {
    return await this.apiClient.get<IRecommendationStore[]>(
      `/recommendation/popular-stores`,
      {
        headers: this.headers,
      },
    );
  }
}
