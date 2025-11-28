import {
  INotificationsHistory,
  INotificationsHistoryResponse,
} from '@/types/api/notifications.types';
import { apiClient } from '../../api';

export class NotificationsHistoryService {
  static apiClient = apiClient;
  static headers?: HeadersInit;

  static async getAll(
    storeId: string,
    params?: {
      page?: number;
      limit?: number;
      type?: string;
      status?: string;
      search?: string;
    },
  ) {
    const queryParams = new URLSearchParams();
    if (params) {
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.type && params.type !== 'all')
        queryParams.append('type', params.type);
      if (params.status && params.status !== 'all')
        queryParams.append('status', params.status);
      if (params.search) queryParams.append('search', params.search);
    }

    return await this.apiClient.get<INotificationsHistoryResponse>(
      `/partner/stores/${storeId}/notifications/history?${queryParams.toString()}`,
      {
        headers: this.headers,
      },
    );
  }

  static async create(
    storeId: string,
    notification: Partial<INotificationsHistory>,
  ) {
    return await this.apiClient.post<INotificationsHistory>(
      `/partner/stores/${storeId}/notifications/history`,
      notification,
      {
        headers: this.headers,
      },
    );
  }

  static async update(
    storeId: string,
    notificationsHistory: Partial<INotificationsHistory>,
  ) {
    return await this.apiClient.patch<INotificationsHistory>(
      `/partner/stores/${storeId}/notifications/history/${notificationsHistory.id}`,
      notificationsHistory,
      {
        headers: this.headers,
      },
    );
  }

  static async markAllAsRead(storeId: string) {
    return await this.apiClient.post<INotificationsHistory[]>(
      `/partner/stores/${storeId}/notifications/history/mark-all-as-read`,
      {
        headers: this.headers,
      },
    );
  }

  static async delete(storeId: string, notificationId: string) {
    return await this.apiClient.delete<INotificationsHistory>(
      `/partner/stores/${storeId}/notifications/history/${notificationId}`,
      {
        headers: this.headers,
      },
    );
  }
}
