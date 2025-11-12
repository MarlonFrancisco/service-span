import { IReview } from '@/types/reviews.types';
import { apiClient } from '../api';
import { HttpClientService } from '../api/http-client.service';

export interface ICreateReviewPayload {
  store: { id: string };
  user: { id: string };
  rating: number;
  comment: string;
}

export interface ICreateReviewResponse {
  review: IReview;
  averageRating: number;
  totalReviews: number;
}

export class ReviewsService {
  static apiClient: HttpClientService = apiClient;

  static async getByStore(storeId: string) {
    return await this.apiClient.get<IReview[]>(
      `/partner/stores/${storeId}/reviews`,
    );
  }

  static async create(payload: ICreateReviewPayload) {
    return await this.apiClient.post<IReview>(
      `/partner/stores/${payload.store.id}/reviews`,
      payload,
    );
  }

  static async update(reviewId: string, payload: ICreateReviewPayload) {
    return await this.apiClient.put<IReview>(
      `/partner/stores/${payload.store.id}/reviews/${reviewId}`,
      payload,
    );
  }

  static async delete(storeId: string, reviewId: string) {
    return await this.apiClient.delete<{ id: string }>(
      `/partner/stores/${storeId}/reviews/${reviewId}`,
    );
  }
}
