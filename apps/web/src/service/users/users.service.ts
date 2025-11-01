import { IUser } from '@/types/api';
import { apiClient } from '../api';
import { HttpClientService } from '../api/http-client.service';

export class UsersService {
  static apiClient: HttpClientService = apiClient;

  static async getUser({ headers }: { headers?: HeadersInit } = {}) {
    return await this.apiClient.get<IUser>('/users/me', {
      headers,
    });
  }

  static async isSubscribed() {
    const user = await this.getUser();
    return user?.isSubscribed;
  }
}
