import { INotificationsHistory } from '@/types/api/stores.types';
import { apiClient } from '../../api';

export class NotificationsHistoryService {
  static apiClient = apiClient;
  static headers?: HeadersInit;

  static async getAll(storeId: string) {
    return await this.apiClient.get<INotificationsHistory[]>(
      `/partner/stores/${storeId}/notifications/history`,
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
    notificationId: string,
    notification: Partial<INotificationsHistory>,
  ) {
    return await this.apiClient.put<INotificationsHistory>(
      `/partner/stores/${storeId}/notifications/history/${notificationId}`,
      notification,
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
